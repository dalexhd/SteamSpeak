const {
	Offline,
	Online,
	Busy,
	Away,
	Snooze,
	LookingToTrade,
	LookingToPlay,
	Invisible,
	Max
} = require('steam-user').EPersonaState;

export default {
	[Offline]: 'Offline',
	[Online]: 'Online',
	[Busy]: 'Busy',
	[Away]: 'Away',
	[Snooze]: 'Snooze',
	[LookingToTrade]: 'Looking to trade',
	[LookingToPlay]: 'Looking to play',
	[Invisible]: 'Invisible',
	[Max]: 'Max',
	Playing: 'Playing'
};
