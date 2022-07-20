// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const jsdocOverride = defineEslintConfigOverride({
	files: ['*'],

	plugins: ['jsdoc'],

	extends: ['plugin:jsdoc/recommended'],

	settings: {
		jsdoc: {
			mode: 'typescript',
		},
	},

	rules: {
		'jsdoc/check-access': 1,
		'jsdoc/check-alignment': 1,
		'jsdoc/check-examples': 0, // TODO: Enable when it supports ESLint 8
		'jsdoc/check-indentation': 0, // does not work properly with wrapped lines
		'jsdoc/check-line-alignment': 1,
		'jsdoc/check-param-names': 1,
		'jsdoc/check-property-names': 1,
		'jsdoc/check-syntax': 1,
		'jsdoc/check-tag-names': 1,
		'jsdoc/check-types': 1,
		'jsdoc/check-values': 1,
		'jsdoc/empty-tags': 1,
		'jsdoc/implements-on-classes': 1,
		'jsdoc/match-description': 0,
		'jsdoc/multiline-blocks': 1,
		'jsdoc/newline-after-description': 1,
		'jsdoc/no-bad-blocks': 1,
		'jsdoc/no-defaults': 1,
		'jsdoc/no-missing-syntax': 0,
		'jsdoc/no-multi-asterisks': 0,
		'jsdoc/no-restricted-syntax': 0,
		'jsdoc/no-types': 1,
		'jsdoc/no-undefined-types': 1,
		'jsdoc/require-asterisk-prefix': 1,
		'jsdoc/require-description': 1,
		'jsdoc/require-description-complete-sentence': 0,
		'jsdoc/require-example': 1,
		'jsdoc/require-hyphen-before-param-description': 1,
		'jsdoc/require-jsdoc': 0, // forces jsdoc for function implementation when there are overloads
		'jsdoc/require-param': 1,
		'jsdoc/require-param-description': 1,
		'jsdoc/require-param-name': 1,
		'jsdoc/require-param-type': 1,
		'jsdoc/require-property': 1,
		'jsdoc/require-property-description': 1,
		'jsdoc/require-property-name': 1,
		'jsdoc/require-property-type': 1,
		'jsdoc/require-returns': 1,
		'jsdoc/require-returns-check': 1,
		'jsdoc/require-returns-description': 1,
		'jsdoc/require-returns-type': 1,
		'jsdoc/require-throws': 1,
		'jsdoc/require-yields': 1,
		'jsdoc/require-yields-check': 1,

		'jsdoc/tag-lines': [
			'warn',
			'never',
			{
				noEndLines: true,
				dropEndLines: true,
				tags: { example: { lines: 'always' } },
			},
		],

		'jsdoc/valid-types': 1,
	},
})
