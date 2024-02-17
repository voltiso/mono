// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Linter } from 'eslint'
// @ts-expect-error no typings
import cssPlugin from 'eslint-plugin-css'

import { codeFiles } from '../files'

export const cssOverride: Linter.FlatConfig[] = [
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
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
