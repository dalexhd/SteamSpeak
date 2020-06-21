import '@utils/string';
import Cache from '@core/Cache';
import { Request, Response } from 'express';

/**
 * Redirect to the shortened url.
 *
 * @param {Request} req The express request instance
 * @param {Response} res The express response instance
 * @returns {Promise<any>}
 */
export const shorten = async function (req: Request, res: Response): Promise<any> {
	const url = (await Cache.get(`shorten:${req.params.hash}`)) as string;
	if (!url) return res.sendStatus(404);
	return res.redirect(url);
};
