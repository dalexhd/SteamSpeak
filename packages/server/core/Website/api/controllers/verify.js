const Events = require('../../../Events');
const lang = require('../../../../locales');
const crypto = require('crypto');
const Cache = require('../../../Cache');
const { findClients } = require('./auth');
const log = require('../../../../utils/log');
const User = require('../../../Database/models/user');

/**
 * Check request secret.
 *
 * @param {object} req The express request instance
 */
const findSecret = async function (req) {
	let secret = req.body.secret;
	let steamData = JSON.parse(await Cache.get(`verification:${secret}`));
	if (steamData === null) throw { statusCode: 404, message: lang.error.invalid_token };
	return steamData;
};

/**
 * Check if the user is connected to the server.
 *
 * @param {object} req The express request instance
 * @param {object} res The express response instance
 */
exports.check = async (req, res) => {
	log.info('Recieved verification check request from remote.', 'website');
	try {
		let steamData = await findSecret(req);
		let clients = await findClients(req, {
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
exports.send = async (req, res) => {
	log.info(`Recieved verification send request to ${req.body.dbid} from remote.`, 'website');
	try {
		let steamData = await findSecret(req);
		let [client] = await findClients(req, {
			client_type: 0,
			client_database_id: req.body.dbid
		});
		let token = crypto.randomBytes(3).toString('hex');
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
						ip: client.connectionclientip,
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
exports.login = async (req, res) => {
	log.info(`Recieved login request from ${req.body.dbid}.`, 'website');
	try {
		let steamData = await findSecret(req);
		let [client] = await findClients(req, {
			client_type: 0,
			client_database_id: req.body.dbid
		});
		let sendCache = JSON.parse(await Cache.get(`${client.databaseId}:verifyToken`));

		if (typeof sendCache === 'undefined')
			throw { statusCode: 500, message: lang.error.unexpected_verification_error };
		if (sendCache.token !== req.body.token) {
			throw { statusCode: 403, message: lang.error.invalid_password };
		} else if (sendCache.ip !== client.connectionclientip) {
			throw { statusCode: 403, message: lang.error.ip_mismatch };
		} else {
			log.success(`${client.nickname} verified successfuly!`, 'website');
			User.create({
				uid: client.uniqueIdentifier,
				dbid: client.databaseId,
				steamId: steamData.steamId
			});
			Events.emit('verificationSucess', steamData.steamId, client.databaseId);
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
