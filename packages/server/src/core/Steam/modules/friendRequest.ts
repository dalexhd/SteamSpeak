import { steamUser } from '@core/Steam';
import { Ts3 } from '@core/TeamSpeak';
import web_config from '@config/website';
const SteamUser = require('steam-user');
import * as crypto from 'crypto';
import Cache from '@core/Cache';
import Events from '@core/Events';
import lang from '@locales/index';
import VerifiedClient from '@core/Database/models/verifiedClient';

Events.on('verificationExpired', (data) => {
	const _data = JSON.parse(data);
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
	const steamId = senderID.getSteamID64();
	if (message === '!verify') {
		if (
			!(await VerifiedClient.exists({
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
	const steamId = senderID.getSteamID64();
	const secret = crypto.randomBytes(20).toString('hex');
	let userData = await steamUser.getPersonas([senderID]);
	userData = userData.personas[steamId];
	Object.assign(userData, { steamId });
	Cache.set(`verification:${secret}`, JSON.stringify(userData), 'ex', 600);
	steamUser.chatMessage(
		senderID,
		lang.message.verify_page_msg.replaceArray(
			['{URL}'],
			[`${web_config.hostname || 'localhost'}/verify/${secret}`]
		)
	);
};

const friendDeleted = async (senderID) => {
	const steamId = senderID.getSteamID64();
	const User = await VerifiedClient.findOne({ steamId });
	if (User) {
		const [client] = await Ts3.clientList({
			client_type: 0,
			client_unique_identifier: User.uid
		});
		User.remove(() => {
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
