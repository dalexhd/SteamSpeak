import { steamUser } from '@core/Steam';
import SteamUser from 'steam-user';
import shortid from 'shortid';
import { Ts3, TeamSpeakClient } from '@core/TeamSpeak';
import { getPresenceString } from '@utils/steam';
import { difference } from '@utils/array';
import webConfig from '@config/website';
import Cache from '@core/Cache';
import VerifiedClient from '@core/Database/models/verifiedClient';
import lang from '@locales/index';
import log from '@utils/log';

let groupNumber: number;

const syncNumbers = async (): Promise<void> => {
	const connectedClients = await Ts3.clientList({
		client_type: 0
	});
	const connectedUids = connectedClients.map((client) => client.uniqueIdentifier);
	const users = await VerifiedClient.find();
	const verifiedOfflineUsers = users.filter(
		(user) => !connectedUids.includes(user.uid) && typeof user.groupId !== 'undefined'
	);
	let verifiedOnlineUsers = users.filter(
		(user) => connectedUids.includes(user.uid) && typeof user.groupId !== 'undefined'
	);
	groupNumber = verifiedOnlineUsers.length;
	if (verifiedOfflineUsers.length > 0) {
		verifiedOfflineUsers.forEach((user) => {
			Ts3.serverGroupDel(user.groupId, 1);
			user.groupId = undefined;
			user.groupNumber = undefined;
			user.save();
		});
	}

	if (verifiedOnlineUsers.length > 0) {
		verifiedOnlineUsers = verifiedOnlineUsers.sort(
			(current, next) => current.groupNumber - next.groupNumber
		);
		Ts3.serverGroupList({
			type: 1
		}).then((serverGroups) => {
			verifiedOnlineUsers.forEach((user, index) => {
				const number = index + 1;
				const serverGroup = serverGroups.find((e) => e.sgid === user.groupId);
				if (serverGroup && user.groupNumber !== number) {
					Ts3.serverGroupRename(
						user.groupId,
						serverGroup.name.replace(/^#([0-9])\s+(.*?)$/, `#${number} $2`)
					);
					user.groupNumber = number;
					user.save();
				}
			});
		});
	}
};

syncNumbers();

const friendDeleted = async (senderID): Promise<void> => {
	const steamId = senderID.getSteamID64();
	const user = await VerifiedClient.findOne({ steamId });
	if (typeof user?.groupId !== 'undefined') {
		Ts3.serverGroupDel(user.groupId, 1);
		groupNumber--;
		syncNumbers();
	}
};

const checkServerGroup = async (
	user: VerifiedClientDocument,
	presenceString: string,
	data: any
): Promise<void> => {
	if (typeof user.groupId === 'undefined') {
		log.info('User has not group. Lets assign it.', 'steam');
		groupNumber++;
		Ts3.serverGroupCreate(`#${groupNumber} SteamSpeak`).then(async (serverGroup) => {
			Promise.all([
				serverGroup.addClient(user.dbid),
				serverGroup.addPerm('i_group_show_name_in_tree', 2),
				serverGroup.rename(
					`#${groupNumber} ${
						presenceString || lang.steam.status[data.persona_state] || lang.steam.status[0]
					}`
				)
			]).then(() => {
				user.groupId = serverGroup.sgid;
				user.groupNumber = groupNumber;
				user.save();
				log.info(`ServerGroup assigned to ${user.steamId}`, 'steam');
			});
		});
	} else {
		const groupName = `#${user.groupNumber} ${
			presenceString || lang.steam.status[data.persona_state] || lang.steam.status[0]
		}`;
		const serverGroup = await Ts3.getServerGroupByID(user.groupId);
		if (serverGroup?.name !== groupName) {
			serverGroup
				?.rename(groupName)
				.then(() => {
					log.info(`Renamed group ${user.groupId} to ${groupName}`, 'steam');
				})
				.catch(async (err) => {
					if (err.id === 2560) {
						user.groupId = undefined;
						user.groupNumber = undefined;
						user.save();
						groupNumber--;
						steamUser.getPersonas([user.steamId]);
					}
				});
		}
	}
};

/**
 * Generate client description steam banner.
 * This creates a short link containing some data parameters that redirects to the website generated image.
 * @param  {TeamSpeakClient|undefined} client The TeamSpeak client.
 * @param  {string} presenceString The client steam rich presence string.
 * @param  {any} data The client steam data.
 */
const checkDescriptionBanner = async (
	client: TeamSpeakClient | undefined,
	presenceString: string,
	data: any
): Promise<void> => {
	if (data.game_played_app_id) {
		steamUser.getProductInfo([data.game_played_app_id], [], function (err, apps) {
			const app = apps[data.game_played_app_id];
			let url = `${webConfig.hostname}/api/widget/client-description?icon=${app.appinfo.common.clienticon}&appid=${data.game_played_app_id}&name=${app.appinfo.common.name}&data=${presenceString}`;
			const shorten = shortid.generate();
			Cache.set(`shorten:${shorten}`, url, 'ex', 3600);
			let client_description = `[img]${webConfig.hostname}/api/s/${shorten}[/img]`;
			if (data.game_lobby_id !== '0') {
				url = `steam://joinlobby/${data.game_played_app_id}/${data.game_lobby_id}/${data.steamId}`;
				const shorten_1 = shortid.generate();
				Cache.set(`shorten:${shorten_1}`, url, 'ex', 3600);
				client_description = `[url=${webConfig.hostname}/api/s/${shorten_1}][img]${webConfig.hostname}/api/s/${shorten}[/img][/url]`;
			}
			client
				?.edit({
					client_description
				})
				.then(() => {
					log.info(`Changed ${client.nickname} description to "${client_description}"`, 'steam');
				});
		});
	} else {
		if ((await client?.getInfo())?.client_description) {
			client
				?.edit({
					client_description: ''
				})
				.then((value) => {
					log.info(`Removed ${client.nickname} description`, 'steam');
				});
		}
	}
};

/**
 * Check if the client is playing a game which is integrated with SteamSpeak.
 * @param  {TeamSpeakClient|undefined} client The TeamSpeak client.
 * @param  {any} data The client steam data.
 * @param  {VerifiedClientDocument} user The user database document.
 */
const checkPlayingGame = async (
	client: TeamSpeakClient | undefined,
	data: any,
	user: VerifiedClientDocument
): Promise<void> => {
	const steamCache = JSON.parse((await Cache.get(`${client?.databaseId}:steamData`)) as string);
	const diff = difference(steamCache || {}, data);
	Cache.set(`${client?.databaseId}:steamData`, JSON.stringify(data));
	if (data.game_played_app_id && steamUser.games.has(data.game_played_app_id)) {
		const game = steamUser.games.get(data.game_played_app_id);
		game.main(data, client, user, diff);
	}
};

// Called when a steam user event gets emitted.
steamUser.on('user', async (sid, data) => {
	const steamId = sid.getSteamID64();
	//Check if the user is verified.
	const user = await VerifiedClient.findOne({ steamId });
	if (!user) return;
	const client = await Ts3.getClientByUID(user.uid);
	if (!client) return;
	const presenceString = await getPresenceString(data);
	Promise.all([
		checkServerGroup(user, presenceString, data),
		checkDescriptionBanner(client, presenceString, Object.assign({ steamId }, data)),
		checkPlayingGame(client, data, user)
	]);
});

// Called when a steam friend relationship status gets changed.
steamUser.on('friendRelationship', (senderID, relationship) => {
	const { None } = SteamUser.EFriendRelationship;
	switch (relationship) {
		case None:
			friendDeleted(senderID);
			break;
	}
});

// Called when a TeamSpeak client gets disconnected.
Ts3.on('clientdisconnect', async (ev) => {
	const { client } = ev;
	const user = await VerifiedClient.findOne({ uid: client?.uniqueIdentifier });
	if (typeof user?.groupId !== 'undefined') {
		Ts3.serverGroupDel(user.groupId, 1);
		user.groupId = undefined;
		user.groupNumber = undefined;
		user.save();
		groupNumber--;
		log.info(`TeamSpeak ServerGroup deleted to client ${user.steamId}`, 'steam');
		syncNumbers();
	}
});

// Called when a TeamSpeak client gets connected.
Ts3.on('clientconnect', async (ev) => {
	const { client } = ev;
	const user = await VerifiedClient.findOne({ uid: client.uniqueIdentifier });
	if (user) steamUser.getPersonas([user.steamId]);
});
