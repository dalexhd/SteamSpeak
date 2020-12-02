interface CanvasRenderingContext2D {
	drawTextWithEmoji(
		fillType: string,
		text: string,
		x: number,
		y: number,
		maxWidth?: number,
		emojiSideMarginPercent?: number,
		emojiTopMarginPercent?: number
	): Promise<void>;
}
