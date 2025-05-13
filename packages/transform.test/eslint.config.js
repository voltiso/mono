// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

import baseConfig from '../../eslint.config.js'

export default defineEslintFlatConfig(...baseConfig, {
	rules: {
		'no-restricted-imports': 'off',
		'@typescript-eslint/no-useless-empty-export': 'off',
		'@typescript-eslint/class-methods-use-this': 'off',
		'unicorn/prefer-module': 'off',
		'notice/notice': 'off',
		'n/no-path-concat': 'off',
		'prefer-template': 'off',
		'import/no-duplicates': 'off',
		'import/newline-after-import': 'off',
		'import/first': 'off',
		'import/imports-first': 'off',
		'simple-import-sort/exports': 'off',
		'es-x/no-export-ns-from': 'off',
		'no-explicit-type-exports/no-explicit-type-exports': 'off',
		'import/consistent-type-specifier-style': 'off',
		'@typescript-eslint/no-import-type-side-effects': 'off',
		'unicorn/prefer-export-from': 'off',
		'@voltiso/no-useless-path-segments': 'off',
		'@typescript-eslint/consistent-type-imports': 'off',
		'@typescript-eslint/consistent-type-definitions': 'off',
		'@typescript-eslint/no-magic-numbers': 'off',
		'sonarjs/void-use': 'off',
		'@typescript-eslint/no-unsafe-return': 'off',
		'@typescript-eslint/no-unsafe-call': 'off',
		'sonarjs/no-undefined-assignment': 'off',
		'no-shadow-restricted-names': 'off',
		'sonarjs/no-globals-shadowing': 'off',
		'sonarjs/variable-name': 'off',
		'@typescript-eslint/no-empty-function': 'off',
	},
})
