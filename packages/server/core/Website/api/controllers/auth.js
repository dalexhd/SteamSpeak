const Ts3 = require('../../../TeamSpeak');
const lang = require('../../../../locales');
require('../../../../utils/string');
const crypto = require('crypto');
const Cache = require('../../../Cache');
const log = require('../../../../utils/log');
const config = require('../../../../config/website');
const jwt = require('jsonwebtoken');

/**
 * Find clients with the request ip.
 *
 * @param {object} req The express request instance
 * @param {object} filter The filter to apply to the clientList command.
 */
exports.findClients = async function (req, filter) {
	let ip =
		req.headers['cf-connecting-ip'] ||
		req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress;
	ip = '172.17.0.1';
	let clients = await Ts3.clientList({
		connection_client_ip: ip,
		...filter
	});
	let result = clients.filter((client) => {
		return config.admins.includes(client.uniqueIdentifier);
	});
	if (clients.length > 0 && result.length === 0)
		throw { statusCode: 400, message: lang.error.not_an_admin };
	if (clients.length === 0) throw { statusCode: 400, message: lang.error.client_not_found };
	return result;
};

/**
 * Create JWT token for the user.
 *
 * @param {string} uid The client unique identifier.
 */
const createToken = function (uid) {
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
exports.find = async (req, res) => {
	log.info('Recieved find request from remote.', 'website');
	try {
		let clients = await this.findClients(req, {
			client_type: 0
		});
		res.status(200).json(clients);
	} catch (error) {
		res.status(error.statusCode).json({
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
	log.info(`Recieved send request to ${req.body.dbid} from remote.`, 'website');
	try {
		let [client] = await this.findClients(req, {
			client_type: 0,
			client_database_id: req.body.dbid
		});
		let token = crypto.randomBytes(3).toString('hex');
		client
			.message(
				lang.message.login_msg.replaceArray(['{NICKNAME}', '{TOKEN}'], [client.nickname, token])
			)
			.then(() => {
				Cache.set(
					`${client.databaseId}:token`,
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
		let [client] = await this.findClients(req, {
			client_type: 0,
			client_database_id: req.body.dbid
		});
		let sendCache = JSON.parse(await Cache.get(`${client.databaseId}:token`));

		if (typeof sendCache === 'undefined')
			throw { statusCode: 500, message: lang.error.unexpected_verification_error };
		if (sendCache.token !== req.body.token) {
			throw { statusCode: 403, message: lang.error.invalid_password };
		} else if (sendCache.ip !== client.connectionclientip) {
			throw { statusCode: 403, message: lang.error.ip_mismatch };
		} else {
			log.success(`${client.nickname} logged successfuly!`, 'website');
			Cache.del(`${client.databaseId}:token`);
			const accessToken = createToken(client.uniqueIdentifier);
			res.status(201).json({
				status: 'success',
				accessToken,
				userData: client
			});
		}
	} catch (error) {
		res.status(error.statusCode || 400).json({
			status: 'error',
			message: error.message
		});
	}
};

/**
 * Get the logged user info
 *
 * @param {object} req The express request instance
 * @param {object} res The express response instance
 */
exports.me = async (req, res) => {
	try {
		var decoded = jwt.verify(req.token, config.jwt.secret);
		const client = await Ts3.getClientByUID(decoded.uid);
		res.status(200).json({ userData: client });
	} catch (error) {
		res.status(error.statusCode || 401).json({
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
exports.refreshToken = async (req, res) => {
	try {
		var decoded = jwt.verify(req.token, config.jwt.secret);
		const client = Ts3.getClientByUID(decoded.uid);
		const accessToken = createToken(client.uid);
		res.status(200).json({
			status: 'success',
			accessToken,
			userData: client
		});
	} catch (error) {
		res.status(error.statusCode || 401).json({
			status: 'error',
			message: error.message
		});
	}
};
