const fsp = require('fs').promises;
const path = require('path');
const Joi = require('@hapi/joi');

/**
 * Get files inside directory
 * @param {string} dir
 */
async function getFiles(dir) {
	const files = await fsp.readdir(dir);
	return Promise.all(
		files
			.map((f) => path.join(dir, f))
			.map(async (f) => {
				const stats = await fsp.stat(f);
				return stats.isDirectory() ? getFiles(f) : f;
			})
	);
}

/**
 * Validate plugin config
 * @param {Object} plugin File object
 */
async function validatePlugin(plugin) {
	return new Promise((resolve, reject) => {
		const schema = Joi.object({
			name: Joi.string().required(),
			desc: Joi.string().required(),
			config: Joi.object({
				enabled: Joi.boolean().required(),
				data: [Joi.object(), Joi.array()],
				interval: Joi.object({
					weeks: Joi.number().min(0),
					days: Joi.number().min(0).max(7),
					hours: Joi.number().min(0).max(23),
					minutes: Joi.number().min(0).max(59),
					seconds: Joi.number().min(0).max(59)
				})
			})
		});
		schema
			.validateAsync(plugin)
			.then((result) => {
				resolve(result.value);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

module.exports = {
	getFiles,
	validatePlugin
};
