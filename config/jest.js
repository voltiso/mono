// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('@voltiso/config.jest.esr')

/** @type {import('ts-jest').InitialOptionsTsJest} */
module.exports = {
	...config,
	modulePathIgnorePatterns: [
		...config.modulePathIgnorePatterns,
		//
	],
}
