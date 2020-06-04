import '@utils/string';
import Cache from '@core/Cache';
import { Request, Response } from 'express';

/**
 * Redirect to the shortened url.
 *
 * @param {object} req The express request instance
 * @param {object} res The express response instance
 */
export const shorten = async function (req: Request, res: Response): Promise<any> {
	const url = (await Cache.get(`shorten:${req.params.hash}`)) as string;
	if (!url) return res.sendStatus(404);
	return res.redirect(url);
};
