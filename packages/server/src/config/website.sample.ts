export default {
	port: 3000,
	hostname: 'localhost', //Ex: https://my-website.com (without last slash)
	cors: {
		/**
		 * @see https://github.com/expressjs/cors#configuration-options
		 */
		origin: ['*'],
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
		preflightContinue: false,
		optionsSuccessStatus: 204
	},
	jwt: {
		/**
		 * @see https://randomkeygen.com/
		 */
		secret: 'put a secret key here',
		options: {
			expiresIn: '2h'
		}
	},
	admins: [''] //Admin TeamSpeak unique identifiers that have access to the web admin panel.
};
