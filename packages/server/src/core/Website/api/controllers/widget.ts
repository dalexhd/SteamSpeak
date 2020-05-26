import '@utils/string';
import { Request, Response } from 'express';
import Canvas from 'canvas';
import icoToPng from 'ico-to-png';
import request from 'request';

/**
 * Check if the user is connected to the server.
 *
 * @param {object} req The express request instance
 * @param {object} res The express response instance
 */
export const clientDescrtiption = async function (req: Request, res: Response): Promise<any> {
	res.contentType('image/png');
	const canvas = Canvas.createCanvas(800, 250);
	const ctx = canvas.getContext('2d');

	request
		.defaults({ encoding: null })
		.get(
			`https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/${req.query.appid}/${req.query.icon}.ico`,
			(err, response, body) => {
				icoToPng(body, 128).then((icon) => {
					Canvas.loadImage('https://i.imgur.com/bgvVh5s.png').then((lb) => {
						Canvas.loadImage(icon).then(async (logo) => {
							ctx.drawImage(lb, 190, 138, 30, 30);
							ctx.fillStyle = '#fff';
							ctx.font = '40px sans-serif';
							ctx.fillText(req.query.name.toString(), 170, 110, 600);
							ctx.font = '25px sans-serif';
							ctx.fillText(req.query.data.toString(), 230, 163);
							ctx.beginPath();
							ctx.arc(85, 125, 75, 0, Math.PI * 2, true);
							ctx.closePath();
							ctx.clip();
							ctx.drawImage(logo, 10, 50, 150, 150);
							res.send(canvas.toBuffer());
						});
					});
				});
			}
		);
};
