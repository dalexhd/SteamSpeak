const { steamUser } = require('../../Steam');
const SteamUser = require('steam-user');
const Ts3 = require('../../TeamSpeak');
const config = require('../../../config/steam');
const User = require('../../Database/models/user');
const lang = require('../../../locales');
const log = require('../../../utils/log');

var groupNumber;

const syncNumbers = async () => {
	let connectedClients = await Ts3.clientList({
		client_type: 0
	});
	let connectedUids = connectedClients.map((client) => client.uniqueIdentifier);
	let users = await User.find();
	let verifiedOfflineUsers = users.filter(
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
				let number = index + 1;
				let serverGroup = serverGroups.find((e) => e.sgid === user.groupId);
				if (serverGroup && user.groupOrder !== number) {
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

steamUser.getAppRichPresenceLocalization(730, config.language || 'english').then(function () {});

const friendDeleted = async (senderID) => {
	let steamId = senderID.getSteamID64();
	let user = await User.findOne({ steamId });
	if (user && typeof user.groupId !== 'undefined') {
		Ts3.serverGroupDel(user.groupId, 1);
		groupNumber--;
		syncNumbers();
	}
};

// Called when a Steam User change has been made.
steamUser.on('user', async (sid, data) => {
	var steamId = sid.getSteamID64();
	//Check if the user is verified.
	if (await User.exists({ steamId })) {
		let user = await User.findOne({ steamId });
		if (typeof user.groupId === 'undefined') {
			log.info('User has not group. Lets assign it.', 'steam');
			groupNumber++;
			Ts3.serverGroupCreate(`#${groupNumber} SteamSpeak`).then((serverGroup) => {
				Promise.all([
					serverGroup.addClient(user.dbid),
					serverGroup.addPerm('i_group_show_name_in_tree', 2),
					serverGroup.rename(`#${groupNumber} ${lang.steam.status[data.persona_state]}`)
				]).then(() => {
					user.groupId = serverGroup.sgid;
					user.groupNumber = groupNumber;
					user.save();
					log.info(`ServerGroup asigned to ${user.steamId}`, 'steam');
				});
			});
		} else {
			Ts3.serverGroupRename(
				user.groupId,
				`#${user.groupNumber} ${lang.steam.status[data.persona_state]}`
			);
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
	if (await User.exists({ uid: client.uniqueIdentifier })) {
		let user = await User.findOne({ uid: client.uniqueIdentifier });
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
	if (await User.exists({ uid: client.uniqueIdentifier })) {
		let user = await User.findOne({ uid: client.uniqueIdentifier });
		steamUser.getPersonas([user.steamId]);
	}
});
