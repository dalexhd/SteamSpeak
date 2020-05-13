const flattenArray = function (arr: string[], result: string[] = []): string[] {
	for (let i = 0; i < arr.length; i++) {
		const value = arr[i];

		if (Array.isArray(value)) {
			flattenArray(value, result);
		} else {
			result.push(value);
		}
	}
	return result;
};

export { flattenArray };
