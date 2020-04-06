const Ts3 = require('../../../TeamSpeak');
const lang = require('../../../../locales/en');
require('../../../../utils/string');
const crypto = require('crypto');
const Cache = require('../../../Cache');
const config = require('../../../../config/website');
const jwt = require('jsonwebtoken');

/**
 * Print a log message with a customizable color.
 *
 * @param {object} req The express request instance
 * @param {object} filter The filter to apply to the clientList command.
 */
const findClients = async function (req, filter) {
	let ip =
		req.headers['cf-connecting-ip'] ||
		req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress;
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

// Find user by request IP
exports.find = async (req, res) => {
	try {
		let clients = await findClients(req, {
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

// Send the user the key
exports.send = async (req, res) => {
	try {
		let [client] = await findClients(req, {
			client_type: 0,
			client_database_id: req.body.dbid
		});
		let token = crypto.randomBytes(3).toString('hex');
		client
			.message(
				lang.message.login_msg.replaceArray(['{NICKNAME}', '{TOKEN}'], [client.nickname, token])
			)
			.then(() => {
				Cache.set(`${client.databaseId}:token`, {
					ip: client.connectionclientip,
					token
				});
				res.status(200).end();
			});
	} catch (error) {
		res.status(error.statusCode || 400).json({
			status: 'error',
			message: error.message
		});
	}
};

exports.login = async (req, res) => {
	try {
		let [client] = await findClients(req, {
			client_type: 0,
			client_database_id: req.body.dbid
		});
		let sendCache = Cache.get(`${client.databaseId}:token`);
		if (typeof sendCache === 'undefined')
			throw { statusCode: 500, message: lang.error.unexpected_verification_error };
		if (sendCache.token !== req.body.token) {
			throw { statusCode: 403, message: lang.error.invalidPassword };
		} else if (sendCache.ip !== client.connectionclientip) {
			throw { statusCode: 403, message: lang.error.ipMismatch };
		} else {
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
