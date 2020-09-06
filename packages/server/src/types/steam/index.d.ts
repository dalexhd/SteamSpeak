declare module 'steam-user' {
	import { EventEmitter } from 'events';
	import SteamID from 'steamid';
	import * as Interfaces from 'src/types/steam/interfaces';
	import * as Enums from 'src/types/steam/enums';
	export * from 'src/types/steam/enums';
	export * from 'src/types/steam/interfaces';
	class SteamUser extends EventEmitter {
		constructor(details: Partial<Interfaces.DefaultOptions>);
		steamID: null;
		// Account info
		limitations: null;
		vac: null;
		wallet: null;
		emailInfo: null;
		licenses: null;
		gifts: null;

		// Friends and users info
		users: {
			[steamId: string]: Interfaces.PersonaData;
		};
		groups: {};
		chats: {};
		myFriends: {};
		myGroups: {};
		myFriendGroups: {};
		myNicknames: {};
		steamServers: {};
		contentServersReady: false;
		playingState: { blocked: false; appid: 0 };
		_playingBlocked: false;
		_playingAppIds: [];

		_gcTokens: []; // game connect tokens
		_connectTime: 0;
		_connectionCount: 0;
		_connectTimeout: 1000;
		_authSeqMe: 0;
		_authSeqThem: 0;
		_contentServers: [];
		_contentServersTimestamp: 0;
		_contentServerTokens: {};
		_lastNotificationCounts: {};
		_sessionID: 0;
		_jobs: {};
		_richPresenceLocalization: {};
		_initialized: false;

		// App and package cache
		_changelistUpdateTimer: null;
		picsCache: {
			changenumber: 0;
			apps: {};
			packages: {};
		};

		_sentry: null;

		options: Interfaces.DefaultOptions;

		//Custom
		games: Map<any, any>;
		friendPersonasLoaded: boolean;

		logOn(options: Interfaces.LogonDetails): void;
		logOff(): void;
		relog(): void;
		webLogOn(): void;
		requestValidationEmail(callback: (err: NodeJS.ErrnoException | null) => void): void;
		enableTwoFactor(
			callback: (
				err: NodeJS.ErrnoException | null,
				response: {
					server_time: number | null;
					shared_secret: string | null;
					identity_secret: string | null;
					secret_1: string | null;
				}
			) => void
		): void;
		joinChat(chatId: string): void;
		gamesPlayed(
			apps: number | number[] | string | Interfaces.GamesPlayedApp,
			force?: boolean
		): void;
		chatMessage(steamId: SteamID | string, message: string, type?: Enums.EChatEntryType): void;
		setOption(option: string, value: any): void;
		// sendMessage(source: any, message: string, entryType: Enums.): void;
		setPersona(state: Enums.EPersonaState, name?: string): void;
		getPersonas(
			steamids: string[] | SteamID[],
			callback?: (PersonasData) => void
		): Promise<Interfaces.PersonasData>;
		addFriend(
			steamId: SteamID | string,
			callback?: (err: NodeJS.ErrnoException | null, personaName: string) => void
		): Promise<string>;
		removeFriend(steamId: SteamID | string): void;
		getProductInfo(
			apps: number[] | Interfaces.Apps[],
			packages: number[] | Interfaces.Packages[],
			inclTokens?: boolean,
			callback?: (
				err: NodeJS.ErrnoException | null,
				apps: Interfaces.App[],
				packages: object,
				unknownApps: number[],
				unknownPackages: number[]
			) => void
		): Promise<Interfaces.ProductInfo>;
		getProductInfo(
			apps: number[] | Interfaces.Apps[],
			packages: number[] | Interfaces.Packages[],
			callback?: (
				err: NodeJS.ErrnoException | null,
				apps: Interfaces.App[],
				packages: object,
				unknownApps: number[],
				unknownPackages: number[]
			) => void
		): Interfaces.ProductInfo;
		getAppRichPresenceLocalization(
			appID: number,
			language: string,
			callback?: (
				err: NodeJS.ErrnoException | null,
				response: {
					tokens: object;
				}
			) => void
		): Promise<Interfaces.AppRichPresence>;

		//Custom
		getPresenceString(
			user: Interfaces.PersonaData,
			groupNumber: number
		): Promise<string | undefined>;
		isFriendOf(steamId: SteamID | string): boolean;
		loadGames(): Promise<void>;
		loadModules(): Promise<void>;
		watchGames(): void;

		// Event emitter
		on<T extends keyof Interfaces.CMEventCallback>(
			eventType: T,
			callback: Interfaces.CMEventCallback[T]
		): this;

		once<T extends keyof Interfaces.CMEventCallback>(
			eventType: T,
			callback: Interfaces.CMEventCallback[T]
		): this;
	}
	// TODO: Anyway to fix this?
	// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
	// @ts-ignore
	export = SteamUser;
}
