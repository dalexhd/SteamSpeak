import { steamUser } from '@core/Steam';
import { Ts3 } from '@core/TeamSpeak';
import web_config from '@config/website';
import SteamUser from 'steam-user';
import crypto from 'crypto';
import Cache from '@core/Cache';
import Events from '@core/Events';
import lang from '@locales/index';
import VerifiedClient from '@core/Database/models/verifiedClient';
import SteamID from 'steamid';

Events.on('verificationExpired', (data) => {
	const _data = JSON.parse(data);
	steamUser.chatMessage(
		_data.steamId,
		'⠀\nVerification has expired.\nPlease send !verify to for another retry 😄'
	);
});

Events.on('verificationSuccess', (steamId: string) => {
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

//TODO: Translate this messages.
// Called when steam bot receives a message
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

const startVerification = async (senderID): Promise<void> => {
	const steamId = senderID.getSteamID64();
	const secret = crypto.randomBytes(20).toString('hex');
	const userData = (await steamUser.getPersonas([senderID])).personas[steamId];
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

const friendDeleted = async (senderID: SteamID): Promise<void> => {
	const steamId = senderID.getSteamID64();
	const User = await VerifiedClient.findOne({ steamId });
	if (User) {
		const client = await Ts3.getClientByUid(User.uid);
		User.remove(() => {
			client?.poke(lang.steam.friend.deleted);
		});
	}
};

const newFriend = async (senderID: SteamID): Promise<void> => {
	steamUser.addFriend(senderID).then(() => {
		startVerification(senderID);
	});
};
