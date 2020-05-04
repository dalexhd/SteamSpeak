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
	admins: [''] //Array of admin uids that should be ablo to login into the web admin panel.
};
