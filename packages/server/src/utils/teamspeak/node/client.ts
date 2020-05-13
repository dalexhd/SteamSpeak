import { TeamSpeakClient } from 'ts3-nodejs-library';
import { convertToMilliseconds } from '@utils/time';

TeamSpeakClient.prototype.isAfk = function (minTime: Interval): boolean {
	return (
		this.idleTime > convertToMilliseconds(minTime) &&
		(this.outputMuted === 1 || this.away === 1 || this.inputMuted === 1)
	);
};
