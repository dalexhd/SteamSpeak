import * as Enums from 'src/types/steam/enums';
import SteamID from 'steamid';

export interface LogonDetails {
	accountName: string;
	password: string;
	loginKey?: string;
	webLogonToken?: string;
	steamID?: string | SteamID;
	authCode?: string;
	two_factor_code?: string;
	rememberPassword?: boolean;
	logonID?: string | number;
	machineName?: string;
	clientOS?: number | Enums.EOSType;
}

export interface DefaultOptions {
	protocol: Enums.EConnectionProtocol.Auto;
	httpProxy: string;
	localAddress: string;
	localPort: number;
	autoRelogin: boolean;
	singleSentryfile: boolean;
	machineIdType: Enums.EMachineIDType.AccountNameGenerated;
	machineIdFormat: string[];
	enablePicsCache: boolean;
	picsCacheAll: boolean;
	changelistUpdateInterval: number;
	saveAppTickets: boolean;
	additionalHeaders: object;
	language: string;
	webCompatibilityMode: boolean;
}

export interface PersonaData {
	rich_presence: RichPresence[];
	persona_state: Enums.EPersonaState;
	game_played_app_id: number;
	game_server_ip: number;
	game_server_port: number;
	persona_state_flags: number;
	online_session_instances: number;
	published_instance_id: number;
	persona_set_by_user: boolean | null;
	player_name: string;
	query_port: number;
	steamid_source: string;
	avatar_hash: Buffer;
	last_logoff: Date;
	last_logon: Date;
	last_seen_online: Date;
	clan_rank: number;
	game_name: string;
	gameid: number;
	game_data_blob: Buffer;
	clan_data: string;
	clan_tag: string;
	broadcast_id: string;
	game_lobby_id: string;
	watching_broadcast_accountid: number;
	watching_broadcast_appid: number;
	watching_broadcast_viewers: number;
	watching_broadcast_title: number;
	avatar_url_icon: string;
	avatar_url_medium: string;
	avatar_url_full: string;
	rich_presence_string: string;
	diff: {
		[K in keyof Partial<Omit<PersonaData, 'diff'>>]: {
			from: PersonaData[K];
			to: PersonaData[K];
		};
	};
}

export interface PersonasData {
	personas: {
		[steamId: number]: PersonaData;
	};
}

export interface CMsgClientLogonResponse {
	eresult: Enums.EResult | Enums.EResult.Fail;
	out_of_game_heartbeat_seconds: number;
	in_game_heartbeat_seconds: number;
	public_ip: number;
	rtime32_server_time: string;
	account_flags: number;
	cell_id: number;
	email_domain: string;
	steam2_ticket: number;
	eresult_extended: number;
	webapi_authenticate_user_nonce: string;
	cell_id_ping_threshold: number;
	use_pics: boolean;
	vanity_url: string;
	client_supplied_steamid: string;
	ip_country_code: string;
	parental_settings: number;
	parental_setting_signature: number;
	count_loginfailures_to_migrate: number;
	count_disconnects_to_migrate: number;
	ogs_data_report_time_window: number;
	client_instance_id: number;
}

export interface Apps {
	appid: number;
	access_token: string;
}

export interface App {
	appinfo: {
		common: {
			name: string;
			clienticon: string;
			any;
		};
		any;
	};
	any;
}

export interface ProductInfo {
	apps: App[];
	packages: object;
	unknownApps: number[];
	unknownPackages: number[];
}

export interface GamesPlayedApp {
	game_id: number;
	game_extra_info: string;
}

export interface Packages {
	packageid: number;
	access_token: string;
}

export interface AppRichPresence {
	tokens: object;
}

export interface RichPresence {
	key: string;
	value: string;
}

export interface CMEventCallback {
	webSession: (sessionId: string, cookies: string[]) => void;
	friendRelationship: (sid: SteamID, relationship: Enums.EFriendRelationship) => void;
	user: (sid: SteamID, user: PersonaData) => void;
	loggedOn: (details: CMsgClientLogonResponse, parental: object) => void;
	friendMessage: (senderID: SteamID, message: string) => void;
	debug: (message: string) => void;
	error: (err: Error) => void;
	disconnected: (eresult: Enums.EResult, msg?: string) => void;
	friendPersonasLoaded: () => void;
}
