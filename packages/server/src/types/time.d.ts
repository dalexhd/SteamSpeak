import { Enumerate } from './misc';

declare global {
	interface Interval {
		/**
		 * Week count interval
		 *
		 * @type {number} A int number
		 */
		weeks: number;
		/**
		 * Days count interval
		 *
		 * @type {Enumerate<7>} A number between 0 and 6
		 */
		days: Enumerate<7>;
		/**
		 * Hours count interval
		 *
		 * @type {Enumerate<7>} A number between 0 and 23
		 */
		hours: Enumerate<24>;
		// prettier-ignore
		/**
		 * Minutes count interval
		 *
		 * @type {number} A number between 0 and 59
		 */
		minutes: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59;
		// prettier-ignore
		/**
		 * Seconds count interval
		 *
		 * @type {number} A number between 0 and 59
		 */
		seconds: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59;
	}
}
