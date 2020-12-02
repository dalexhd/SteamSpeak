import { Request, Response } from 'express';
import moment from 'moment';
import log from '@utils/log';

/**
 * Get all logs.
 *
 * @param {Request} req The express request instance
 * @param {Response} res The express response instance
 * @returns {Promise<any>}
 */
export const index = async function (req: Request, res: Response): Promise<any> {
	try {
		log.query(
			{
				from: moment().subtract(100, 'years').toDate(),
				until: moment().toDate(),
				limit: Number.MAX_SAFE_INTEGER,
				start: 0,
				order: 'desc',
				fields: ['message', 'timestamp', 'type', 'level', 'instance']
			},
			function (err, results) {
				if (err) throw { statusCode: 400, message: err.message };
				res.status(200).json(results.file);
			}
		);
	} catch (error) {
		res.status(error.statusCode || 400).json({
			status: 'error',
			message: error.message
		});
	}
};
