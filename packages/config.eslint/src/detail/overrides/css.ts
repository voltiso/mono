// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import cssPlugin from 'eslint-plugin-css'

import { codeFiles } from '../files'
import { defineConfig } from 'eslint/config'

export const cssOverride = defineConfig({
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
})
