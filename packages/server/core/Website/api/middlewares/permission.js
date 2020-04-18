const lang = require('../../../../locales');

/**
 * Check if the user has the given role/s to perform an action.
 *
 * @export
 * @param {*} allowed Comma separated string
 */
exports.permit = function (...allowed) {
	const isAllowed = (role) => allowed.indexOf(role) > -1;

	// return a middleware
	return (request, response, next) => {
		if (request.client && isAllowed(request.client.role)) next();
		// role is allowed, so continue on the next middleware
		else {
			response.status(403).json({ message: lang.errornot_allowed }); // user is forbidden
		}
	};
};
