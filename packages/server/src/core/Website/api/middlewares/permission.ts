import lang from '@locales/index';
import { Request, Response, NextFunction } from 'express';

/**
 * Check if the user has the given role/s to perform an action.
 *
 * @export
 * @param {*} allowed Comma separated string
 */
export const permit = function (...allowed: string[]): any {
	const isAllowed = (role: string): boolean => allowed.indexOf(role) > -1;

	// return a middleware
	return (request: Request, response: Response, next: NextFunction): void => {
		if (request.client && isAllowed(request.role)) next();
		// role is allowed, so continue on the next middleware
		else {
			response.status(403).json({ message: lang.error.not_allowed }); // user is forbidden
		}
	};
};
