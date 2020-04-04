// Vuex Store
process.env.VERSION = require('../../../../package.json').version;

describe('Misc', () => {
	it('Has a valid version', () => {
		expect(process.env.VERSION).toMatch(
			new RegExp(/^([0-9]{1,2})+[.]+([0-9]{1,2})+[.]+([0-9]{1,2})/)
		);
	});
});
