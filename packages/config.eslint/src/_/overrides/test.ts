// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { testFiles } from '../files'

/* eslint-disable sort-keys-fix/sort-keys-fix */

export const testOverride = {
	files: testFiles,

	env: {
		jest: true,
	},

	extends: [
		/** React - CRA */
		'react-app/jest',

		'plugin:jest/all',
		'plugin:jest-dom/recommended', // seems to have all rules enabled?
		'plugin:jest-formatting/strict',
	],

	plugins: ['jest', 'jest-async', 'jest-dom', 'jest-formatting'],

	rules: {
		'jest-async/expect-return': 'error',
		'jest/prefer-lowercase-title': 0,
	},
}
