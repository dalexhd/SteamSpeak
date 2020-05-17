import { steamUser } from '@core/Steam';
import SteamUser from 'steam-user';
import { Ts3 } from '@core/TeamSpeak';
import config from '@config/steam';
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

// eslint-disable-next-line @typescript-eslint/no-empty-function
steamUser.getAppRichPresenceLocalization(730, config.language || 'english').then(function () {});

const friendDeleted = async (senderID): Promise<void> => {
	const steamId = senderID.getSteamID64();
	const user = await VerifiedClient.findOne({ steamId });
	if (user && typeof user.groupId !== 'undefined') {
		Ts3.serverGroupDel(user.groupId, 1);
		groupNumber--;
		syncNumbers();
	}
};

// Called when a Steam User change has been made.
steamUser.on('user', async (sid, data) => {
	const steamId = sid.getSteamID64();
	//Check if the user is verified.
	if (await VerifiedClient.exists({ steamId })) {
		const user = await VerifiedClient.findOne({ steamId });
		if (!user || !(await Ts3.getClientByUID(user.uid))) return;
		if (typeof user.groupId === 'undefined') {
			log.info('User has not group. Lets assign it.', 'steam');
			groupNumber++;
			Ts3.serverGroupCreate(`#${groupNumber} SteamSpeak`).then((serverGroup) => {
				Promise.all([
					serverGroup.addClient(user.dbid),
					serverGroup.addPerm('i_group_show_name_in_tree', 2),
					serverGroup.rename(
						`#${groupNumber} ${lang.steam.status[data.persona_state] || lang.steam.status[0]}`
					)
				]).then(() => {
					user.groupId = serverGroup.sgid;
					user.groupNumber = groupNumber;
					user.save();
					log.info(`ServerGroup assigned to ${user.steamId}`, 'steam');
				});
			});
		} else {
			Ts3.serverGroupRename(
				user.groupId,
				`#${user.groupNumber} ${lang.steam.status[data.persona_state] || lang.steam.status[0]}`
			).catch(async (err) => {
				if (err.id === 2560) {
					user.groupId = undefined;
					user.groupNumber = undefined;
					user.save();
					groupNumber -= 1;
					steamUser.getPersonas([user.steamId]);
				}
			});
		}
	}
});

// Called when a Steam User change has been made.
steamUser.on('friendRelationship', (senderID, relationship) => {
	const { None } = SteamUser.EFriendRelationship;
	switch (relationship) {
		case None:
			friendDeleted(senderID);
			break;
	}
});

// Called when a TeamSpeak user gets disconnected.
Ts3.on('clientdisconnect', async (ev) => {
	const { client } = ev;
	if (await VerifiedClient.exists({ uid: client?.uniqueIdentifier })) {
		const user = await VerifiedClient.findOne({ uid: client?.uniqueIdentifier });
		if (!user) return;
		if (typeof user.groupId !== 'undefined') {
			Ts3.serverGroupDel(user.groupId, 1);
			user.groupId = undefined;
			user.groupNumber = undefined;
			user.save();
			groupNumber -= 1;
			log.info(`TeamSpeak ServerGroup deleted to client ${user.steamId}`, 'steam');
			syncNumbers();
		}
	}
});

// Called when a TeamSpeak user gets connected.
Ts3.on('clientconnect', async (ev) => {
	const { client } = ev;
	if (await VerifiedClient.exists({ uid: client.uniqueIdentifier })) {
		const user = await VerifiedClient.findOne({ uid: client.uniqueIdentifier });
		if (user) steamUser.getPersonas([user.steamId]);
	}
});
