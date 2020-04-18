const { steamUser } = require('../../Steam');
const Ts3 = require('../../TeamSpeak');
const web_config = require('../../../config/website');
const User = require('../../Database/models/user');
const SteamUser = require('steam-user');
const crypto = require('crypto');
const Cache = require('../../Cache');
const Events = require('../../Events');
const lang = require('../../../locales');

Events.on('verificationExpired', (data) => {
	let _data = JSON.parse(data);
	steamUser.chatMessage(
		_data.steamId,
		'⠀\nVerification has expired.\nPlease send !verify to for another retry 😄'
	);
});

Events.on('verificationSucess', (steamId) => {
	steamUser.chatMessage(steamId, lang.message.success_verification);
	steamUser.getPersonas([steamId]);
});

// Called when a Steam User change has been made.
steamUser.on('friendRelationship', (senderID, relationship) => {
	const { RequestRecipient, Friend, None } = SteamUser.EFriendRelationship;
	switch (relationship) {
		case RequestRecipient || Friend:
			newFriend(senderID);
			break;
		case None:
			friendDeleted(senderID);
			break;
		default:
			break;
	}
});

// Called when steam bot recieves a message
steamUser.on('friendMessage', async (senderID, message) => {
	let steamId = senderID.getSteamID64();
	if (message === '!verify') {
		if (
			!(await User.exists({
				steamId
			}))
		) {
			startVerification(senderID);
		} else {
			steamUser.chatMessage(senderID, "You're already verified.");
		}
	} else {
		steamUser.chatMessage(senderID, 'Command not found.\nPlease send !verify');
	}
});

const startVerification = async (senderID) => {
	let steamId = senderID.getSteamID64();
	let secret = crypto.randomBytes(20).toString('hex');
	let userData = await steamUser.getPersonas([senderID]);
	userData = userData.personas[steamId];
	Object.assign(userData, { steamId });
	Cache.set(`verification:${secret}`, JSON.stringify(userData), 'ex', 600);
	steamUser.chatMessage(
		senderID,
		lang.message.verify_page_msg.replaceArray(
			['{URL}'],
			[`${web_config.hostname}/verify/${secret}`]
		)
	);
};

const friendDeleted = async (senderID) => {
	let steamId = senderID.getSteamID64();
	let user = await User.findOne({ steamId });
	if (user) {
		let [client] = await Ts3.clientList({
			client_type: 0,
			client_unique_identifier: user.uid
		});
		user.remove(() => {
			if (client) {
				client.poke(lang.steam.friend.deleted);
			}
		});
	}
};

const newFriend = async (senderID) => {
	steamUser.addFriend(senderID).then(() => {
		startVerification(senderID);
	});
};
