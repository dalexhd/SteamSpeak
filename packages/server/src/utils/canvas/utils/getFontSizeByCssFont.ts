// Get font size by cssFont and Return size in px.
export default function (cssFont): number {
	const pxMatch = cssFont.match(/([0-9]+)px/);
	if (pxMatch) return Number(pxMatch[1]);
	// default
	return 10;
}
