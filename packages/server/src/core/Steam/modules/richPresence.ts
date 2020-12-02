import { steamUser } from '@core/Steam';
import SteamUser from 'steam-user';
import { Ts3, TeamSpeakClient } from '@core/TeamSpeak';
import { difference } from '@utils/array';
import webConfig from '@config/website';
import Cache from '@core/Cache';
import VerifiedClient from '@core/Database/models/verifiedClient';
import lang from '@locales/index';
import log from '@utils/log';
import crypto from 'crypto';
import { isEmpty, omit } from 'lodash';

let groupNumber: number;

const syncNumbers = async (): Promise<void> => {
	const connectedClients = await Ts3.clientList({
		clientType: 0
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
			Ts3.serverGroupDel(user.groupId, true);
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
			type: 1,
			namemode: 2
		}).then((serverGroups) => {
			verifiedOnlineUsers.forEach((user, index) => {
				const client = connectedClients.find((client) => client.databaseId === user.dbid);
				const number = index + 1;
				const steamGroups = serverGroups.filter((e) => e.name.match(/^#([0-9]+)\s+(.*?)$/));
				steamGroups.forEach(async (serverGroup) => {
					if (serverGroup.sgid === user.groupId && user.groupNumber !== number) {
						Ts3.serverGroupRename(
							user.groupId,
							serverGroup.name.replace(/^#([0-9]+)\s+(.*?)$/, `#${number} $2`)
						);
						user.groupNumber = number;
						user.save();
					} else if (
						client?.servergroups.includes(serverGroup.sgid) &&
						serverGroup.sgid !== user.groupId
					) {
						//In case the user has multiple SteamSpeak groups, delete them.
						//This is determined if the group starts with "#" REGEX(/^#([0-9]+)\s+(.*?)$/)) and if the group name mode is 2 (right tag)
						serverGroup.del(true);
						log.warn(
							`Online client [dbid: ${user.dbid}] has SteamSpeak corrupted serverGroup [sgid: ${serverGroup.sgid}]. Deleting...`,
							{ type: 'steam' }
						);
					}
				});
			});
		});
	}
};

syncNumbers();

/**
 * Delete client assigned group
 * @param {string} steamId The client SteamID64.
 * @returns {Promise<void>}
 */
const deleteFriend = async (steamId: string): Promise<void> => {
	const user = await VerifiedClient.findOne({ steamId });
	if (typeof user?.groupId !== 'undefined') {
		Ts3.serverGroupDel(user.groupId, true);
		groupNumber--;
		syncNumbers();
	}
};

/**
 * Check the state of the user server group.
 * This creates, removes, or changes a server group.
 * @param {VerifiedClientDocument} user The user database document.
 * @param {(string | undefined)} presenceString The client steam rich presence string.
 * @param {SteamUser.PersonaData} data The client steam data.
 * @param {(TeamSpeakClient | undefined)} client The TeamSpeak client.
 * @returns {Promise<void>}
 */
const checkServerGroup = async (
	user: VerifiedClientDocument,
	presenceString: string | undefined,
	data: SteamUser.PersonaData,
	client: TeamSpeakClient | undefined
): Promise<void> => {
	if (typeof user.groupId === 'undefined') {
		log.info('User has not group. Lets assign it.', { type: 'steam' });
		groupNumber++;
		Ts3.serverGroupCreate(`#${groupNumber} SteamSpeak`).then(async (serverGroup) => {
			Promise.all([
				serverGroup.addClient(user.dbid),
				serverGroup.addPerm({ permname: 'i_group_show_name_in_tree', permvalue: 2 }),
				serverGroup.rename(
					`#${groupNumber} ${
						presenceString || lang.steam.status[data.persona_state] || lang.steam.status[0]
					}`
				)
			])
				.then(() => {
					user.groupId = serverGroup.sgid;
					user.groupNumber = groupNumber;
					user.save();
					log.info(`ServerGroup assigned to ${client?.nickname} [steamID: ${user.steamId}]`, {
						type: 'steam'
					});
				})
				.catch((err) => {
					log.error(
						`richPresence richPresence[sgCreateName: #${groupNumber} SteamSpeak] error: ${err.message}. Deleting group...`,
						{ type: 'steam' }
					);
					serverGroup.del(true);
				});
		});
	} else {
		const groupName = `#${user.groupNumber} ${
			presenceString || lang.steam.status[data.persona_state] || lang.steam.status[0]
		}`;
		const serverGroup = await Ts3.getServerGroupById(user.groupId);
		if (serverGroup?.name !== groupName) {
			serverGroup
				?.rename(groupName)
				.then(() => {
					log.info(`Renamed group ${user.groupId} to ${groupName}`, { type: 'steam' });
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
 * @param {(TeamSpeakClient | undefined)} client The TeamSpeak client.
 * @param {(string | undefined)} presenceString The client steam rich presence string.
 * @param {SteamUser.PersonaData} data The client steam data.
 * @param {string} steamId The client steamId
 * @returns {Promise<void>}
 */
const checkDescriptionBanner = async (
	client: TeamSpeakClient | undefined,
	presenceString: string | undefined,
	data: SteamUser.PersonaData,
	steamId: string
): Promise<void> => {
	const clientInfo = await client?.getInfo();
	if (data.game_played_app_id) {
		steamUser.getProductInfo([data.game_played_app_id], [], function async(err, apps) {
			const app = apps[data.game_played_app_id];
			let url = `${webConfig.hostname}/api/widget/client-description?icon=${app.appinfo.common.clienticon}&appid=${data.game_played_app_id}&name=${app.appinfo.common.name}&data=${presenceString}`;
			const shorten = crypto.createHash('sha1').update(url).digest('hex').substring(0, 8);
			Cache.set(`shorten:${shorten}`, url, 'ex', 3600);
			let clientDescription = `[img]${webConfig.hostname}/api/s/${shorten}[/img]`;
			if (data.game_lobby_id !== '0') {
				url = `steam://joinlobby/${data.game_played_app_id}/${data.game_lobby_id}/${steamId}`;
				const shorten_1 = crypto.createHash('sha1').update(url).digest('hex').substring(0, 8);
				Cache.set(`shorten:${shorten_1}`, url, 'ex', 3600);
				clientDescription = `[url=${webConfig.hostname}/api/s/${shorten_1}][img]${webConfig.hostname}/api/s/${shorten}[/img][/url]`;
			}
			clientInfo?.clientDescription !== clientDescription &&
				client
					?.edit({
						clientDescription
					})
					.then(() => {
						log.info(`Changed ${client.nickname} description to "${clientDescription}"`, {
							type: 'steam'
						});
					});
		});
	} else {
		if ((await client?.getInfo())?.clientDescription) {
			client
				?.edit({
					clientDescription: ''
				})
				.then(() => {
					log.info(`Removed ${client.nickname} description`, { type: 'steam' });
				});
		}
	}
};

/**
 * Check if the client is playing a game which is integrated with SteamSpeak.
 * @param {(TeamSpeakClient | undefined)} client The TeamSpeak client.
 * @param {SteamUser.PersonaData} data The client steam data.
 * @param {VerifiedClientDocument} user The user database document.
 * @returns {Promise<void>}
 */
const checkPlayingGame = async (
	client: TeamSpeakClient | undefined,
	data: SteamUser.PersonaData,
	user: VerifiedClientDocument
): Promise<void> => {
	if (data.game_played_app_id && steamUser.games.has(data.game_played_app_id)) {
		const game = steamUser.games.get(data.game_played_app_id);
		game.main(data, client, user);
	}
};

steamUser.on('user', async (sid, data) => {
	// This solves the problem of assigning multiple server groups to each client on load.
	if (!steamUser.friendPersonasLoaded) return;
	const steamId = sid.getSteamID64();
	data.diff = difference(omit(steamUser.users[steamId], 'diff'), omit(data, 'diff'));
	//If there're not changes on the user, skip it.
	if (isEmpty(data.diff)) return;
	//Check if the user is verified.
	const user = await VerifiedClient.findOne({ steamId });
	if (!user) return;
	const client = await Ts3.getClientByUid(user.uid);
	if (!client) return;
	const presenceString = await steamUser.getPresenceString(data, user.groupNumber);
	Promise.all([
		checkServerGroup(user, presenceString, data, client),
		checkDescriptionBanner(client, presenceString, data, steamId),
		checkPlayingGame(client, data, user)
	]);
});

// Called when a steam friend relationship status gets changed.
steamUser.on('friendRelationship', (senderID, relationship) => {
	const { None } = SteamUser.EFriendRelationship;
	switch (relationship) {
		case None:
			deleteFriend(senderID.getSteamID64());
			break;
	}
});

// Called when a TeamSpeak client gets disconnected.
Ts3.on('clientdisconnect', async (ev) => {
	const { client } = ev;
	const user = await VerifiedClient.findOne({ uid: client?.uniqueIdentifier });
	if (typeof user?.groupId !== 'undefined') {
		Ts3.serverGroupDel(user.groupId, true);
		user.groupId = undefined;
		user.groupNumber = undefined;
		user.save();
		groupNumber--;
		log.info(`TeamSpeak ServerGroup deleted to client ${user.steamId}`, { type: 'steam' });
		syncNumbers();
	}
});

// Called when a TeamSpeak client gets connected.
Ts3.on('clientconnect', async (ev) => {
	const { client } = ev;
	syncNumbers();
	const user = await VerifiedClient.findOne({ uid: client.uniqueIdentifier });
	if (user) steamUser.getPersonas([user.steamId]);
});
