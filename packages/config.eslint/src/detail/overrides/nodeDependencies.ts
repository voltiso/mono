// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getAllRules } from '@voltiso/config.eslint.lib'
import { defineConfig } from 'eslint/config'
import nodeDependenciesPlugin from 'eslint-plugin-node-dependencies'
import jsoncEslintParser from 'jsonc-eslint-parser'

// console.log('???', nodeDependenciesPlugin.configs.recommended)

export const nodeDependencies = defineConfig(
	{
		plugins: {
			'node-dependencies': nodeDependenciesPlugin as never,
		},
	},
	{
		files: ['**/package.json', 'package.json'],

		languageOptions: {
			parser: jsoncEslintParser,
		},

		rules: {
			...getAllRules(nodeDependenciesPlugin, 'node-dependencies', 'warn'),
			'node-dependencies/compat-engines': 0, // bugged
			'node-dependencies/no-dupe-deps': 2,
			'node-dependencies/valid-semver': 1, // does not pass: "xxx": "^4.1.2 || 5_is_esm_only"
			'node-dependencies/absolute-version': ['warn', 'never'],
			'node-dependencies/no-deprecated': 1,
			'node-dependencies/no-restricted-deps': 1,
			'node-dependencies/prefer-caret-range-version': 0,
			'node-dependencies/prefer-tilde-range-version': 0,
			'node-dependencies/require-provenance-deps': 0,
		},
	},
)
