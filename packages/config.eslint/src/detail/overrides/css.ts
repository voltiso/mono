// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

import { codeFiles } from '../files'

// @ts-expect-error no typings
import cssPlugin from 'eslint-plugin-css'

export const cssOverride = defineEslintFlatConfig(cssPlugin.configs.all, {
	files: [...codeFiles, '*.css'],

	// plugins: ['css'],
	// plugins: {
	// 	css: cssPlugin
	// },

	// extends: [
	// 	// 'plugin:css/recommended',
	// 	'plugin:css/all',
	// ],

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
