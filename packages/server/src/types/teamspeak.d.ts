import './time';
declare global {
	/**
	 * This gets loaded when the plugin contains a single interval.
	 *
	 * @interface CommonPluginConfig
	 */
	interface CommonPluginConfig {
		name: string;
		description: string;
		config: {
			enabled: boolean;
			data: {
				[key: string]: any;
			};
			/**
			 * The plugin contains a single interval.
			 *
			 * @type {Interval}
			 */
			interval: Interval;
		};
	}
	/**
	 * This gets loaded when the plugin contains multiple intervals.
	 *
	 * @interface UncommonPluginConfig
	 */
	interface UncommonPluginConfig {
		name: string;
		description: string;
		config: {
			enabled: boolean;
			data: [
				{
					[key: string]: any;
					/**
					 * The plugin contains multiple intervals.
					 *
					 * @type {Interval}
					 */
					interval: Interval;
				}
			];
		};
	}
}

declare module 'ts3-nodejs-library' {
	interface TeamSpeak {
		plugins: any;
	}

	interface TeamSpeakClient {
		isAfk(minTime: Interval): boolean;
		role: string;
	}
}

declare module 'ts3-nodejs-library/lib/types/ResponseTypes' {
	interface ServerInfo {
		virtualserverTotalPing: number;
		virtualserverTotalPacketlossTotal: number;
		virtualserverChannelsonline: number;
		virtualserverTotalBytesUploaded: number;
		virtualserverTotalBytesDownloaded: number;
		virtualserverClientsonline: number;
		virtualserverQueryclientsonline: number;
	}
}
