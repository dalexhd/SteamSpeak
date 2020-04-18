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

module.exports = {
	[Offline]: 'Desconectado',
	[Online]: 'Conectado',
	[Busy]: 'Ocupado',
	[Away]: 'Ausente',
	[Snooze]: 'Snooze',
	[LookingToTrade]: 'Deseando trade',
	[LookingToPlay]: 'Deseando jugar',
	[Invisible]: 'Invisible',
	[Max]: 'Max'
};
