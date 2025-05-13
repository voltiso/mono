// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Linter } from 'eslint'
import cssPlugin from 'eslint-plugin-css'

import { codeFiles } from '../files'

export const cssOverride: Linter.Config[] = [
	{
		files: [...codeFiles, '**/*.css'],

		plugins: {
			css: cssPlugin as never,
		},

		// extends: [
		// 	// 'plugin:css/recommended',
		// 	'plugin:css/all',
		// ],

		rules: {
			...(cssPlugin.configs.all.rules as {}),
		},

		settings: {
			css: {
				target: {
					attributes: [
						'css', // The plugin will also parse `css` attribute.
					],
				},
			},
		},
	},
]
