const fsp = require('fs').promises;
import * as path from 'path';
import Joi from '@hapi/joi';

/**
 * Get files inside directory
 * @param {string} dir The directory path
 * @param {boolean} arrayDir
 */
const getFiles = async function (dir: string, arrayDir?: boolean): Promise<string[]> {
	const files = await fsp.readdir(dir);
	return Promise.all(
		files
			.map((f) => path.join(dir, f))
			.map(async (f) => {
				const stats = await fsp.stat(f);
				return stats.isDirectory()
					? arrayDir
						? { [path.basename(f)]: await getFiles(f) }
						: await getFiles(f)
					: f;
			})
	);
};

/**
 * Validate plugin config
 * @param {Object} plugin File object
 */
const validatePlugin = async function (plugin: object): Promise<void> {
	return new Promise((resolve, reject) => {
		const schema = Joi.object({
			name: Joi.string().required(),
			description: Joi.string().required(),
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
};

/**
 * Validate game config
 * @param {Object} game File object
 */
const validateGame = async function (game: object): Promise<void> {
	return new Promise((resolve, reject) => {
		const schema = Joi.object({
			appId: Joi.number().required(),
			name: Joi.string().required(),
			config: Joi.object({
				enabled: Joi.boolean().required(),
				data: [Joi.object(), Joi.array()]
			})
		});
		schema
			.validateAsync(game)
			.then((result) => {
				resolve(result.value);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export { getFiles, validatePlugin, validateGame };
