// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineConfig } from 'eslint/config'
// @ts-expect-error no typings
import noConstructorBindPlugin from 'eslint-plugin-no-constructor-bind'

export const noConstructorBind = defineConfig({
	// files: ['*'],

	// plugins: ['no-constructor-bind'],
	plugins: {
		'no-constructor-bind': noConstructorBindPlugin as never,
	},

	rules: {
		'no-constructor-bind/no-constructor-bind': 'error',
		'no-constructor-bind/no-constructor-state': 'error',
	},
})
