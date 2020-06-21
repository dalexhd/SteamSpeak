import { loadImage } from 'canvas';

const cachedTwemojiImages = new Map();

export default async function (url): Promise<unknown> {
	return new Promise(async (resolve) => {
		if (cachedTwemojiImages.has(url)) {
			return resolve(cachedTwemojiImages.get(url));
		}
		const image = await loadImage(url);
		cachedTwemojiImages.set(url, image);
		return resolve(image);
	});
}
