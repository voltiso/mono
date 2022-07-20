// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

const config = require('@voltiso/config.jest.zone')

/** @type {import('ts-jest').InitialOptionsTsJest} */
module.exports = {
	...config,

	modulePathIgnorePatterns: [
		...config.modulePathIgnorePatterns,
		'**/compiler-options/', // do not run compiler-options static checks with ts-jest (checked by `pnpm lint:tsc`)
	],
}
