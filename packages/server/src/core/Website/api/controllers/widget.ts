import '@utils/string';
import { Request, Response } from 'express';
import Canvas from 'canvas';
import icoToPng from 'ico-to-png';
import request from 'request';
import glur from 'glur';
import '@utils/canvas';

/**
 * Check if the user is connected to the server.
 *
 * @param {object} req The express request instance
 * @param {object} res The express response instance
 */
export const clientDescrtiption = async function (req: Request, res: Response): Promise<any> {
	const canvas = Canvas.createCanvas(800, 250);
	const ctx = canvas.getContext('2d');

	request
		.defaults({ encoding: null })
		.get(
			`https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/${req.query.appid}/${req.query.icon}.ico`,
			async (err, response, body) => {
				Promise.all([
					Canvas.loadImage('https://i.imgur.com/bgvVh5s.png'),
					Canvas.loadImage(await icoToPng(body, 128)),
					Canvas.loadImage(
						`https://steamcdn-a.akamaihd.net/steam/apps/${req.query.appid}/header.jpg`
					).catch(function (err) {
						return err;
					})
				])
					.then(async (images) => {
						// Some steam apps doesn't have a background banner, so we only draw that background if success.
						if (!(images[2] instanceof Error)) {
							ctx.drawImage(images[2], 80, 10, 710, 235);
							const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
							glur(new Uint8Array(imageData.data.buffer), canvas.width, canvas.height, 40);
							ctx.putImageData(imageData, 0, 0);
						}
						ctx.drawImage(images[0], 190, 138, 30, 30);
						ctx.fillStyle = '#fff';
						ctx.font = 'bold 40px sans-serif';
						await ctx.drawTextWithEmoji('fill', req.query.name.toString(), 170, 110, 600);
						ctx.font = 'bold 28px sans-serif';
						await ctx.drawTextWithEmoji('fill', req.query.data.toString(), 230, 163);
						ctx.drawImage(images[1], 10, 50, 150, 150);
						res.contentType('image/png').send(canvas.toBuffer());
					})
					.catch((error) => {
						res.status(500).send(error.message);
					});
			}
		);
};
