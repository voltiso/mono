// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineConfig } from 'eslint/config'
// @ts-expect-error no typings
import ext from 'eslint-plugin-ext'

import { codeFiles } from '../files'

export const extOverride = defineConfig({
	files: codeFiles,

	plugins: {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		ext,
	},

	rules: {
		'ext/lines-between-object-properties': [
			'warn',
			'always',
			{ exceptBetweenSingleLines: true },
		],
	},
})
