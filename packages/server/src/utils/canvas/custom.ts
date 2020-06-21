import splitEntitiesFromText from './utils/splitEntitiesFromText';
import loadTwemojiImageByUrl from './utils/loadTwemojiImageByUrl';
import getFontSizeByCssFont from './utils/getFontSizeByCssFont';
import Canvas from 'canvas';

Canvas.CanvasRenderingContext2D.prototype.drawTextWithEmoji = async function (
	fillType: string,
	text: string,
	x: number,
	y: number,
	maxWidth?: number,
	emojiSideMarginPercent = 0.1,
	emojiTopMarginPercent = 0.1
): Promise<void> {
	const textEntities = splitEntitiesFromText(text);
	const fontSize = getFontSizeByCssFont(this.font);
	const baseLine = this.measureText('').alphabeticBaseline;
	const emojiSideMargin = fontSize * emojiSideMarginPercent;
	const emojiTopMargin = fontSize * emojiTopMarginPercent;
	let currentWidth = 0;

	for (let i = 0; i < textEntities.length; i++) {
		const entity = textEntities[i];
		if (typeof entity === 'string') {
			// Common text case
			if (fillType === 'fill') {
				this.fillText(entity, x + currentWidth, y, maxWidth);
			} else {
				this.strokeText(entity, x + currentWidth, y, maxWidth);
			}
			currentWidth += this.measureText(entity).width;
		} else {
			// Emoji case
			const emoji = await loadTwemojiImageByUrl(entity.url);
			this.drawImage(
				emoji,
				x + currentWidth + emojiSideMargin,
				y + emojiTopMargin - fontSize - baseLine,
				fontSize,
				fontSize
			);
			currentWidth += fontSize + emojiSideMargin * 2;
		}
	}
};
