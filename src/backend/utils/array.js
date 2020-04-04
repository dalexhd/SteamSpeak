function flattenArray(arr, result = []) {
	for (let i = 0; i < arr.length; i++) {
		const value = arr[i];

		if (Array.isArray(value)) {
			flattenArray(value, result);
		} else {
			result.push(value);
		}
	}
	return result;
}
module.exports = {
	flatArray: flattenArray
};
