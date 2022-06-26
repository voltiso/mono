// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable sort-keys-fix/sort-keys-fix */

import { codeFiles } from '../files.js'

export const react = {
	files: codeFiles,

	plugins: ['react', 'react-hooks', 'react-native'],

	extends: [
		// React - CRA
		'react-app',

		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
		'plugin:react-native/all',
	],
}
