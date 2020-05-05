import { Ts3, TeamSpeakClient } from '@core/TeamSpeak';
import lang from '@locales/index';
import '@utils/string';
import * as crypto from 'crypto';
import Cache from '@core/Cache';
import log from '@utils/log';
import config from '@config/website';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

/**
 * Find clients with the request ip.
 *
 * @param {object} req The express request instance
 * @param {object} filter The filter to apply to the clientList command.
 */
export const findClients = async function (
	req: Request,
	filter: object
): Promise<TeamSpeakClient[]> {
	let ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'];
	ip = '172.17.0.1';
	const clients = await Ts3.clientList({
		connection_client_ip: ip,
		...filter
	});
	const result = clients.filter((client) => {
		return config.admins.includes(client.uniqueIdentifier);
	});
	if (clients.length > 0 && result.length === 0)
		throw { statusCode: 400, message: lang.error.not_an_admin };
	if (clients.length === 0) throw { statusCode: 400, message: lang.error.ip_not_connected };
	return result;
};

/**
 * Create JWT token for the user.
 *
 * @param {string} uid The client unique identifier.
 */
const createToken = function (uid: string): string {
	return jwt.sign(
		{
			uid
		},
		config.jwt.secret,
		config.jwt.options
	);
};

/**
 * Check if the user is connected to the server.
 *
 * @param {object} req The express request instance
 * @param {object} res The express response instance
 */
export const find = async function (req: Request, res: Response): Promise<any> {
	log.info('Recieved find request from remote.', 'website');
	try {
		const clients = await findClients(req, {
			client_type: 0
		});
		return res.status(200).json(clients);
	} catch (error) {
		return res.status(error.statusCode || 400).json({
			status: 'error',
			message: error.message
		});
	}
};

/**
 * Send to the selected user a secret validation token.
 *
 * @param {object} req The express request instance
 * @param {object} res The express response instance
 */
export const send = async function (req: Request, res: Response): Promise<any> {
	log.info(`Recieved send request to ${req.body.dbid} from remote.`, 'website');
	try {
		const [client] = await findClients(req, {
			client_type: 0,
			client_database_id: req.body.dbid
		});
		const token = crypto.randomBytes(3).toString('hex');
		client
			.message(
				lang.message.login_msg.replaceArray(['{NICKNAME}', '{TOKEN}'], [client.nickname, token])
			)
			.then(() => {
				Cache.set(
					`${client.databaseId}:token`,
					JSON.stringify({
						ip: client.connectionClientIp,
						token
					}),
					'ex',
					600
				);
				return res.status(200).end();
			});
	} catch (error) {
		return res.status(error.statusCode || 400).json({
			status: 'error',
			message: error.message
		});
	}
};

export const login = async function (req: Request, res: Response): Promise<any> {
	log.info(`Recieved login request from ${req.body.dbid}.`, 'website');
	try {
		const [client] = await findClients(req, {
			client_type: 0,
			client_database_id: req.body.dbid
		});
		const sendCache = JSON.parse((await Cache.get(`${client.databaseId}:token`)) as string);

		if (typeof sendCache === 'undefined')
			throw { statusCode: 500, message: lang.error.unexpected_verification_error };
		if (sendCache.token !== req.body.token) {
			throw { statusCode: 403, message: lang.error.invalid_password };
		} else if (sendCache.ip !== client.connectionClientIp) {
			throw { statusCode: 403, message: lang.error.ip_mismatch };
		} else {
			log.success(`${client.nickname} logged successfuly!`, 'website');
			Cache.del(`${client.databaseId}:token`);
			const accessToken = createToken(client.uniqueIdentifier);
			return res.status(201).json({
				status: 'success',
				accessToken,
				userData: client
			});
		}
	} catch (error) {
		return res.status(error.statusCode || 400).json({
			status: 'error',
			message: error.message
		});
	}
};

export const me = async function (req: Request, res: Response): Promise<any> {
	try {
		const decoded = jwt.verify(req.token, config.jwt.secret) as { uid: string };
		const client = await Ts3.getClientByUID(decoded.uid);
		return res.status(200).json({ userData: client });
	} catch (error) {
		return res.status(error.statusCode || 401).json({
			status: 'error',
			message: error.message
		});
	}
};

/**
 * Refresh logged user token
 *
 * @param {object} req The express request instance
 * @param {object} res The express response instance
 */
export const refreshToken = async function (req: Request, res: Response): Promise<any> {
	try {
		const decoded = jwt.verify(req.token, config.jwt.secret) as { uid: string };
		const client = (await Ts3.getClientByUID(decoded.uid)) as TeamSpeakClient;
		const accessToken = createToken(client.uniqueIdentifier);
		return res.status(200).json({
			status: 'success',
			accessToken,
			userData: client
		});
	} catch (error) {
		return res.status(error.statusCode || 401).json({
			status: 'error',
			message: error.message
		});
	}
};
