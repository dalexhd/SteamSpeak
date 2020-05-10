import Events from '@core/Events';
import lang from '@locales/index';
import * as crypto from 'crypto';
import Cache from '@core/Cache';
import { findClients } from './auth';
import log from '@utils/log';
import VerifiedClient from '@core/Database/models/verifiedClient';
import { Request, Response } from 'express';

/**
 * Check request secret.
 *
 * @param {object} req The express request instance
 */
const findSecret = async function (req: Request): Promise<any> {
	const secret = req.body.secret;
	const steamData = JSON.parse((await Cache.get(`verification:${secret}`)) as string);
	if (steamData === null) throw { statusCode: 404, message: lang.error.invalid_token };
	return steamData;
};

/**
 * Check if the user is connected to the server.
 *
 * @param {object} req The express request instance
 * @param {object} res The express response instance
 */
export const check = async function (req: Request, res: Response): Promise<any> {
	log.info('Received verification check request from remote.', 'website');
	try {
		const steamData = await findSecret(req);
		const clients = await findClients(req, {
			client_type: 0
		});
		res.status(200).json({ steam: steamData, clients });
	} catch (error) {
		res.status(error.statusCode || 401).json({
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
	log.info(`Received verification send request to ${req.body.dbid} from remote.`, 'website');
	try {
		const steamData = await findSecret(req);
		const [client] = await findClients(req, {
			client_type: 0,
			client_database_id: req.body.dbid
		});
		const token = crypto.randomBytes(3).toString('hex');
		client
			.message(
				lang.message.verify_msg.replaceArray(
					['{NICKNAME}', '{STEAM_NICKNAME}', '{TOKEN}'],
					[client.nickname, steamData.player_name, token]
				)
			)
			.then(() => {
				Cache.set(
					`${client.databaseId}:verifyToken`,
					JSON.stringify({
						ip: client.connectionClientIp,
						token
					}),
					'ex',
					600
				);
				res.status(200).end();
			});
	} catch (error) {
		res.status(error.statusCode || 400).json({
			status: 'error',
			message: error.message
		});
	}
};

/**
 * Login with specified user
 *
 * @param {object} req The express request instance
 * @param {object} res The express response instance
 */
export const login = async function (req: Request, res: Response): Promise<any> {
	log.info(`Received login request from ${req.body.dbid}.`, 'website');
	try {
		const steamData = await findSecret(req);
		const [client] = await findClients(req, {
			client_type: 0,
			client_database_id: req.body.dbid
		});
		const sendCache = JSON.parse((await Cache.get(`${client.databaseId}:verifyToken`)) as string);

		if (typeof sendCache === 'undefined')
			throw { statusCode: 500, message: lang.error.unexpected_verification_error };
		if (sendCache.token !== req.body.token) {
			throw { statusCode: 403, message: lang.error.invalid_password };
		} else if (sendCache.ip !== client.connectionClientIp) {
			throw { statusCode: 403, message: lang.error.ip_mismatch };
		} else {
			log.success(`${client.nickname} verified successfully!`, 'website');
			VerifiedClient.create({
				uid: client.uniqueIdentifier,
				dbid: client.databaseId,
				steamId: steamData.steamId
			});
			Events.emit('verificationSuccess', steamData.steamId, client.databaseId);
			client.message(lang.message.success_verification);
			Cache.del(`${client.databaseId}:verifyToken`);
			Cache.del(`verification:${req.body.secret}`);
			Cache.del(`shadow:verification:${req.body.secret}`);
			res.status(201).json({
				status: 'success',
				message: lang.message.success_verification
			});
		}
	} catch (error) {
		res.status(error.statusCode || 400).json({
			status: 'error',
			message: error.message
		});
	}
};
