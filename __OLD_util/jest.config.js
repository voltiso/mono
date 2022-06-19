// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('@voltiso/config.jest.zone')

/** @type {import('ts-jest').InitialOptionsTsJest} */
module.exports = {
	...config,
	modulePathIgnorePatterns: [
		...config.modulePathIgnorePatterns,
		'**/compiler-options/', // do not run compiler-options static checks with ts-jest (checked by `pnpm lint:tsc`)
	],
}
