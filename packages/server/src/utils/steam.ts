import lang from '@locales/index';
import { steamUser } from '@core/Steam';

/**
 * Get rich presence string
 * @param {object} steamData The client steam data
 */
const getPresenceString = async function (steamData: any): Promise<any> {
	if (steamData.rich_presence.length > 0) {
		const rpTokens: any = {};
		steamData.rich_presence.forEach((token) => {
			rpTokens[token.key] = token.value;
		});
		if (!rpTokens.steam_display) {
			const customName = lang.steam.games[steamData.gameid];
			return `${lang.steam.status.Playing}: ${customName}`;
		}

		let localizationTokens;
		if (
			steamUser._richPresenceLocalization[steamData.gameid] &&
			lang.steam.tokens[`_${steamData.game_played_app_id}`] &&
			steamUser._richPresenceLocalization[steamData.gameid].timestamp >
				Date.now() - 1000 * 60 * 60 * 24
		) {
			// We already have localization
			localizationTokens = lang.steam.tokens[`_${steamData.game_played_app_id}`];
		} else {
			try {
				localizationTokens = (
					await steamUser.getAppRichPresenceLocalization(
						steamData.gameid,
						steamUser.options.language || 'english'
					)
				).tokens;
			} catch (ex) {
				// Oh well
				delete steamData.rich_presence_string;
				return false;
			}
		}
		for (const i in rpTokens) {
			if (rpTokens.hasOwnProperty(i) && localizationTokens[rpTokens[i]]) {
				rpTokens[i] = localizationTokens[rpTokens[i]];
			}
		}
		let rpString: string = rpTokens.steam_display;
		while (true) {
			let newRpString = rpString;
			for (const i in rpTokens) {
				if (rpTokens.hasOwnProperty(i)) {
					newRpString = newRpString.replace(new RegExp(`%${i}%`, 'gi'), rpTokens[i]);
				}
			}

			(newRpString.match(/{#[^}]+}/g) || []).forEach((token) => {
				const _token = token.substring(1, token.length - 1);
				if (localizationTokens[_token]) {
					newRpString = newRpString.replace(
						new RegExp(`{${_token}}`, 'gi'),
						localizationTokens[_token]
					);
				}
			});

			if (newRpString === rpString) {
				break;
			} else {
				rpString = newRpString;
			}
		}
		return rpString;
	} else if (steamData.game_played_app_id) {
		const customName = lang.steam.games[steamData.gameid];
		if (customName) {
			return `${lang.steam.status.Playing}: ${customName}`;
		} else {
			return lang.steam.status.Playing;
		}
	}
	return false;
};

export { getPresenceString };
