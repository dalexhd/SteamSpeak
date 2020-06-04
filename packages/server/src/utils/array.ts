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

const difference = function (dst, src): object {
	const changes = {};
	Object.keys(src).forEach((key) => {
		if (JSON.stringify(dst[key]) === JSON.stringify(src[key])) return;
		changes[key] = { from: dst[key], to: src[key] };
	});
	return changes;
};

export { flattenArray, difference };
