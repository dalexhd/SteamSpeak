module.exports = {
	enabled: true,
	port: 3000,
	cors: {
		/**
		 * @see https://github.com/expressjs/cors#configuration-options
		 */
		options: {
			origin: ['*'],
			methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
			preflightContinue: false,
			optionsSuccessStatus: 204
		}
	},
	jwt: {
		/**
		 * @see https://randomkeygen.com/
		 */
		secret: '',
		options: {
			expiresIn: '2h'
		}
	},
	admins: [] //Array of admin uids that should be ablo to login into the web admin panel.
};
