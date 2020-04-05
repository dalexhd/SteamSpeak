const Ts3 = require('../../../TeamSpeak');
const lang = require('../../../../locales/en');
const jwt = require('jsonwebtoken');
const config = require('../../../../config/website');

exports.authenticate = async (req, res, next) => {
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
		var decoded = jwt.verify(token, config.jwt.secret);
		const client = Ts3.getClientByUID(decoded.uid);
		client.role = 'admin';
		req.client = client;
		next();
	} catch (err) {
		next(err);
	}
};
