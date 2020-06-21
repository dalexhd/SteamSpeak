import { steamUser } from '@core/Steam';
import GlobalOffensive from 'globaloffensive';
import { TeamSpeakClient } from '@core/TeamSpeak';
import log from '@utils/log';
import BetterQueue from 'better-queue';

let csgo: any;

export const main = async function (
	data: any,
	client: TeamSpeakClient | undefined,
	user: VerifiedClientDocument,
	diff: any
): Promise<void> {
	if (
		diff?.game_played_app_id?.to === info.appId ||
		(diff?.rich_presence?.from.find((e) => e.key === 'game:state')?.value === 'game' &&
			diff?.rich_presence?.to.find((e) => e.key === 'game:state')?.value === 'lobby' &&
			diff?.rich_presence?.from.find((e) => e.key === 'game:mode')?.value === 'competitive' &&
			diff?.rich_presence?.to.find((e) => e.key === 'game:mode') === undefined)
	) {
		const { steamId } = user;
		const queue = new BetterQueue(function (data) {
			log.info(`Processing ${data.steamId}'s rank...`, 'csgo');
			// eslint-disable-next-line @typescript-eslint/no-this-alias
			const self = this;
			csgo.requestPlayersProfile(data.steamId, (response) => {
				data.response = response;
				self.finishBatch(data);
			});
		});
		queue.push({
			steamId
		});
		queue.on('task_finish', function (taskId, result) {
			const rankId = result.response.ranking.rank_id;
			const nextRankGroupId = info.config.data.ranks[rankId].toString();
			const delGroups = client?.servergroups?.filter(
				(serverGroup) =>
					info.config.data.ranks.map(String).includes(serverGroup) &&
					serverGroup !== nextRankGroupId
			);
			if (delGroups && delGroups.length > 0) {
				client?.delGroups(delGroups);
				log.info(`Removed ${delGroups.join(', ')} groups to ${client?.nickname}`, 'csgo');
			}
			if (!client?.servergroups?.includes(nextRankGroupId)) {
				client?.addGroups(nextRankGroupId);
				log.info(`Added ${nextRankGroupId} group to ${client?.nickname}`, 'csgo');
			}
			log.success(
				`${client?.nickname}'s rank has been fetched and it's value is: ${rankId}`,
				'csgo'
			);
		});
	}
};

export const load = async function (): Promise<void> {
	csgo = new GlobalOffensive(steamUser);
	const listener = function (): void {
		log.success('Connected to GC', 'csgo');
		csgo.removeListener('connectedToGC', listener);
	};
	csgo.on('connectedToGC', listener);
	steamUser.gamesPlayed(info.appId);
};

export const unload = function (): void {
	steamUser.gamesPlayed([]);
};

export const info = {
	appId: 730,
	name: 'Counter-Strike: Global Offensive',
	config: {
		enabled: false,
		data: {
			ranks: [
				285, // Unranked
				267, // Silver I
				268, // Silver II
				268, // Silver III
				270, // Silver IV
				271, // Silver Elite
				272, // Silver Elite Master
				273, // Gold Nova I
				274, // Gold Nova II
				275, // Gold Nova III
				276, // Gold Nova Master
				277, // Master Guardian I
				278, // Master Guardian II
				279, // Master Guardian Elite
				280, // Distinguished Master Guardian
				281, // Legendary Eagle
				282, // Legendary Eagle Master
				283, // Supreme Master First Class
				284 // The Global Elite
			]
		}
	}
};
