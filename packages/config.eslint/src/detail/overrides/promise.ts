// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getAllRules } from '@voltiso/config.eslint.lib'
import { defineConfig } from 'eslint/config'
// @ts-expect-error no typings
import promisePlugin from 'eslint-plugin-promise'

import { codeFiles } from '../files'

export const promise = defineConfig(
	// ...eslintFlatConfigFromConfig(promisePlugin.configs.recommended as never, {
	// 	promise: promisePlugin,
	// }),
	{
		// extends: ['plugin:promise/recommended'],

		files: codeFiles,

		plugins: {
			promise: promisePlugin as never,
		},

		rules: {
			...getAllRules(promisePlugin as never, 'promise', 'warn'),

			'promise/no-native': 0,
			'promise/prefer-catch': 0, // dangerous: auto-fix provided breaks PromiseLike objects
		},
	},
)
