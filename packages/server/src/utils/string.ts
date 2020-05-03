String.prototype.replaceArray = function (find: string[], replace: string[]): string {
	// eslint-disable-next-line @typescript-eslint/no-this-alias
	let replaceString = this;
	for (let i = 0; i < find.length; i++) {
		replaceString = replaceString.replace(find[i], replace[i]);
	}
	return replaceString;
};
