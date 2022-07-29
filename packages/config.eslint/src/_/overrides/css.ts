// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

import { codeFiles } from '~/_/files'

export const cssOverride = defineEslintConfigOverride({
	files: [...codeFiles, '*.css'],

	plugins: ['css'],

	extends: [
		// 'plugin:css/recommended',
		'plugin:css/all',
	],

	settings: {
		css: {
			target: {
				attributes: [
					'css', // The plugin will also parse `css` attribute.
				],
			},
		},
	},
} as const)
