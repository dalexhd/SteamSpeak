const { community, steamUser, csgo } = require('../../Steam');
const Ts3 = require('../../TeamSpeak');
const config = require('../../../config/steam');
const SteamUser = require('steam-user');

// Called when a Steam User change has been made.
module.exports.EventSteamFriendRelationship = (senderID, relationship) => {
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
};

function friendDeleted(senderID) {
	let steamId = senderID.getSteamID64();
	console.log(`${steamId} friend deleted`);
}

function newFriend(senderID) {
	let steamId = senderID.getSteamID64();
	steamUser.addFriend(senderID);
	var message =
		'Thanks for accepting SteamSpeak.\n' +
		'Please visit the following URL to link your TeamSpeak account.\n' +
		'[url]';
	steamUser.chatMessage(senderID, message);
}

module.exports.info = {
	name: 'friendRequest',
	desc: 'Load friend request module.',
	config: {
		enabled: true
	}
};
