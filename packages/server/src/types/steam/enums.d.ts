export enum EOSType {
	Unknown = -1,
	Web = -700,
	IOSUnknown = -600,
	AndroidUnknown = -500,
	UMQ = -400,
	PS3 = -300,
	MacOSUnknown = -102,
	MacOS104 = -101,
	MacOS105 = -100,
	MacOS1058 = -99,
	MacOS106 = -95,
	MacOS1063 = -94,
	MacOS1064_slgu = -93,
	MacOS1067 = -92,
	MacOS107 = -90,
	MacOS108 = -89,
	MacOS109 = -88,
	MacOS1010 = -87,
	MacOS1011 = -86,
	MacOS1012 = -85,
	Macos1013 = -84,
	Macos1014 = -83,
	MacOSMax = -1,
	LinuxUnknown = -203,
	Linux22 = -202,
	Linux24 = -201,
	Linux26 = -200,
	Linux32 = -199,
	Linux35 = -198,
	Linux36 = -197,
	Linux310 = -196,
	Linux316 = -195,
	Linux318 = -194,
	Linux3x = -193,
	Linux4x = -192,
	Linux41 = -191,
	Linux44 = -190,
	Linux49 = -189,
	LinuxMax = -101,
	WinUnknown = 0,
	Win311 = 1,
	Win95 = 2,
	Win98 = 3,
	WinME = 4,
	WinNT = 5,
	Win200 = 6, // removed "renamed to Win2000"
	Win2000 = 6,
	WinXP = 7,
	Win2003 = 8,
	WinVista = 9,
	Win7 = 10, // removed "renamed to Windows7"
	Windows7 = 10,
	Win2008 = 11,
	Win2012 = 12,
	Win8 = 13, // removed "renamed to Windows8"
	Windows8 = 13,
	Win81 = 14, // removed "renamed to Windows81"
	Windows81 = 14,
	Win2012R2 = 15,
	Win10 = 16, // removed "renamed to Windows10"
	Windows10 = 16,
	Win2016 = 17,
	WinMAX = 18,
	Max = 26
}

export enum EFriendRelationship {
	None = 0,
	Blocked = 1,
	RequestRecipient = 2,
	Friend = 3,
	RequestInitiator = 4,
	Ignored = 5,
	IgnoredFriend = 6,
	SuggestedFriend = 7 // removed "was used by the original implementation of the facebook linking feature; but now unused."
}

export enum EPersonaState {
	/** Offline */
	Offline = 0,
	// Online
	Online = 1,
	// Busy
	Busy = 2,
	// Away
	Away = 3,
	// Snooze
	Snooze = 4,
	// LookingToTrade
	LookingToTrade = 5,
	// LookingToPlay
	LookingToPlay = 6,
	// Invisible
	Invisible = 7
}

export enum EConnectionProtocol {
	/** Pick one automatically */
	Auto = 0,

	/** TCP with Valve-crypto */
	TCP = 1,

	/** WebSocket with TLS */
	WebSocket = 2
}

export enum EMachineIDType {
	/** No machine ID will be provided to Steam */
	None = 1,

	/** A randomly-generated machine ID will be created on each logon */
	AlwaysRandom = 2,

	/** A machine ID will be generated from your account's username */
	AccountNameGenerated = 3,

	/** A random machine ID will be generated and saved to the {dataDirectory}, and will be used for future logons */
	PersistentRando = 4
}

export enum EChatEntryType {
	Invalid = 0,
	ChatMsg = 1,
	Typing = 2,
	InviteGame = 3,
	Emote = 4, // removed "No longer supported by clients"
	LobbyGameStart = 5, // removed "Listen for LobbyGameCreated_t callback instead"
	LeftConversation = 6,
	Entered = 7,
	WasKicked = 8,
	WasBanned = 9,
	Disconnected = 10,
	HistoricalChat = 11,
	Reserved1 = 12,
	Reserved2 = 13,
	LinkBlocked = 14
}

export enum EResult {
	Invalid = 0,
	OK = 1,
	Fail = 2,
	NoConnection = 3,
	InvalidPassword = 5,
	LoggedInElsewhere = 6,
	InvalidProtocolVer = 7,
	InvalidParam = 8,
	FileNotFound = 9,
	Busy = 10,
	InvalidState = 11,
	InvalidName = 12,
	InvalidEmail = 13,
	DuplicateName = 14,
	AccessDenied = 15,
	Timeout = 16,
	Banned = 17,
	AccountNotFound = 18,
	InvalidSteamID = 19,
	ServiceUnavailable = 20,
	NotLoggedOn = 21,
	Pending = 22,
	EncryptionFailure = 23,
	InsufficientPrivilege = 24,
	LimitExceeded = 25,
	Revoked = 26,
	Expired = 27,
	AlreadyRedeemed = 28,
	DuplicateRequest = 29,
	AlreadyOwned = 30,
	IPNotFound = 31,
	PersistFailed = 32,
	LockingFailed = 33,
	LogonSessionReplaced = 34,
	ConnectFailed = 35,
	HandshakeFailed = 36,
	IOFailure = 37,
	RemoteDisconnect = 38,
	ShoppingCartNotFound = 39,
	Blocked = 40,
	Ignored = 41,
	NoMatch = 42,
	AccountDisabled = 43,
	ServiceReadOnly = 44,
	AccountNotFeatured = 45,
	AdministratorOK = 46,
	ContentVersion = 47,
	TryAnotherCM = 48,
	PasswordRequiredToKickSession = 49,
	AlreadyLoggedInElsewhere = 50,
	Suspended = 51,
	Cancelled = 52,
	DataCorruption = 53,
	DiskFull = 54,
	RemoteCallFailed = 55,
	PasswordNotSet = 56, // removed "renamed to PasswordUnset"
	PasswordUnset = 56,
	ExternalAccountUnlinked = 57,
	PSNTicketInvalid = 58,
	ExternalAccountAlreadyLinked = 59,
	RemoteFileConflict = 60,
	IllegalPassword = 61,
	SameAsPreviousValue = 62,
	AccountLogonDenied = 63,
	CannotUseOldPassword = 64,
	InvalidLoginAuthCode = 65,
	AccountLogonDeniedNoMailSent = 66, // removed "renamed to AccountLogonDeniedNoMail"
	AccountLogonDeniedNoMail = 66,
	HardwareNotCapableOfIPT = 67,
	IPTInitError = 68,
	ParentalControlRestricted = 69,
	FacebookQueryError = 70,
	ExpiredLoginAuthCode = 71,
	IPLoginRestrictionFailed = 72,
	AccountLocked = 73, // removed "renamed to AccountLockedDown"
	AccountLockedDown = 73,
	AccountLogonDeniedVerifiedEmailRequired = 74,
	NoMatchingURL = 75,
	BadResponse = 76,
	RequirePasswordReEntry = 77,
	ValueOutOfRange = 78,
	UnexpectedError = 79,
	Disabled = 80,
	InvalidCEGSubmission = 81,
	RestrictedDevice = 82,
	RegionLocked = 83,
	RateLimitExceeded = 84,
	AccountLogonDeniedNeedTwoFactorCode = 85, // removed "renamed to AccountLoginDeniedNeedTwoFactor"
	AccountLoginDeniedNeedTwoFactor = 85,
	ItemOrEntryHasBeenDeleted = 86, // removed "renamed to ItemDeleted"
	ItemDeleted = 86,
	AccountLoginDeniedThrottle = 87,
	TwoFactorCodeMismatch = 88,
	TwoFactorActivationCodeMismatch = 89,
	AccountAssociatedToMultiplePlayers = 90, // removed "renamed to AccountAssociatedToMultiplePartners"
	AccountAssociatedToMultiplePartners = 90,
	NotModified = 91,
	NoMobileDeviceAvailable = 92, // removed "renamed to NoMobileDevice"
	NoMobileDevice = 92,
	TimeIsOutOfSync = 93, // removed "renamed to TimeNotSynced"
	TimeNotSynced = 93,
	SMSCodeFailed = 94,
	TooManyAccountsAccessThisResource = 95, // removed "renamed to AccountLimitExceeded"
	AccountLimitExceeded = 95,
	AccountActivityLimitExceeded = 96,
	PhoneActivityLimitExceeded = 97,
	RefundToWallet = 98,
	EmailSendFailure = 99,
	NotSettled = 100,
	NeedCaptcha = 101,
	GSLTDenied = 102,
	GSOwnerDenied = 103,
	InvalidItemType = 104,
	IPBanned = 105,
	GSLTExpired = 106,
	InsufficientFunds = 107,
	TooManyPending = 108,
	NoSiteLicensesFound = 109,
	WGNetworkSendExceeded = 110,
	AccountNotFriends = 111,
	LimitedUserAccount = 112,
	CantRemoveItem = 113,
	AccountHasBeenDeleted = 114,
	AccountHasAnExistingUserCancelledLicense = 115,
	DeniedDueToCommunityCooldown = 116
}
