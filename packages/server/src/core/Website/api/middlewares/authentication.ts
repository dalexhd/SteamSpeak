import { Ts3 } from '@core/TeamSpeak';
import lang from '@locales/index';
import jwt from 'jsonwebtoken';
import config from '@config/website';
import { Request, Response, NextFunction } from 'express';

export const authenticate = async function (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> {
	try {
		// 1) check if the token is there
		let token;
		if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
			token = req.headers.authorization.split(' ')[1];
		}
		if (!token) {
			throw { statusCode: 401, message: lang.error.not_logged_in };
		}
		// 2) verify token
		const decoded = jwt.verify(token, config.jwt.secret) as { uid: string };
		req.client = await Ts3.getClientByUid(decoded.uid);
		req.role = 'admin';
		req.token = token;
		next();
	} catch (err) {
		if (err.message === 'invalid token') {
			return res.status(401).json({ message: lang.error.invalid_token }); // user is forbidden
		}
		next();
	}
};
