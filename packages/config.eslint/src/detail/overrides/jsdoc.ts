// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig, getAllRules } from '@voltiso/config.eslint.lib'
import jsdocPlugin from 'eslint-plugin-jsdoc'

import { codeFiles, tsFiles } from '../files'

const allRules = getAllRules(jsdocPlugin as never, 'jsdoc', 'warn')
delete allRules['jsdoc/text-escaping']
delete allRules['jsdoc/match-name']

export const jsdocConfig = defineEslintFlatConfig(
	// jsdocPlugin.configs.recommended as never,
	// ...eslintFlatConfigFromConfig(jsdocPlugin.configs.recommended as never, {
	// 	jsdoc: jsdocPlugin,
	// }),
	{
		files: codeFiles,

		plugins: { jsdoc: jsdocPlugin as never },

		// extends: ['plugin:jsdoc/recommended'],

		settings: {
			jsdoc: {
				mode: 'typescript',
			},
		},

		rules: {
			...allRules,

			'jsdoc/sort-tags': 0,
			'jsdoc/require-template': 0,

			'jsdoc/text-escaping': 0,
			'jsdoc/match-name': 0,

			'jsdoc/require-file-overview': 0,

			'jsdoc/check-access': 1,
			'jsdoc/check-alignment': 1,
			'jsdoc/check-examples': 0, // handled by `examples/examples` processor
			'jsdoc/check-indentation': 0, // does not work properly with wrapped lines
			'jsdoc/check-line-alignment': 0, // conflicts with prettier
			'jsdoc/check-param-names': 1,
			'jsdoc/check-property-names': 1,
			'jsdoc/check-syntax': 1,
			'jsdoc/convert-to-jsdoc-comments': 0,
			'jsdoc/lines-before-block': 0, // handled by `@stylistic/lines-around-comment`

			'jsdoc/check-tag-names': [
				'warn',
				{ definedTags: ['defaultValue', 'inline', 'strip', 'callInfo'] },
			],

			// 'jsdoc/check-tag-names': ['warn', { definedTags: ['type'] }],
			'jsdoc/check-types': 1,
			'jsdoc/check-values': 1,
			'jsdoc/implements-on-classes': 1,
			'jsdoc/match-description': 0,
			'jsdoc/multiline-blocks': 1,
			// 'jsdoc/newline-after-description': 1,

			'jsdoc/no-bad-blocks': [
				'warn',
				{
					ignore: [
						'ts-check',
						'ts-expect-error',
						'ts-ignore',
						'ts-nocheck',
						'__PURE__',
					],
				},
			],

			'jsdoc/no-defaults': 1,
			'jsdoc/no-missing-syntax': 0,
			'jsdoc/no-multi-asterisks': 0,
			'jsdoc/no-restricted-syntax': 0,
			'jsdoc/no-types': 1,
			'jsdoc/no-undefined-types': 0, // does not always work (see ISchema.ts)
			'jsdoc/require-asterisk-prefix': 1,
			'jsdoc/require-description': 0,
			'jsdoc/require-description-complete-sentence': 0,
			'jsdoc/require-example': 0,
			'jsdoc/require-hyphen-before-param-description': 1,
			'jsdoc/require-jsdoc': 0, // forces jsdoc for function implementation when there are overloads
			'jsdoc/require-param': 0,
			'jsdoc/require-param-description': 1,
			'jsdoc/require-param-name': 1,
			'jsdoc/require-param-type': 1,
			'jsdoc/require-property': 1,
			'jsdoc/require-property-description': 1,
			'jsdoc/require-property-name': 1,
			'jsdoc/require-property-type': 1,
			'jsdoc/require-returns': 0,
			'jsdoc/require-returns-check': 0, // does not work with function overloads
			'jsdoc/require-returns-description': 1,
			'jsdoc/require-returns-type': 1,
			'jsdoc/require-throws': 1,
			'jsdoc/require-yields': 1,
			'jsdoc/require-yields-check': 1,

			'jsdoc/tag-lines': 0,

			// ! problematic
			// 'jsdoc/tag-lines': [
			// 	'warn',
			// 	'never',
			// 	{
			// 		startLines: 1,
			// 		tags: { example: { lines: 'always' } },
			// 	},
			// ],

			'jsdoc/empty-tags': 0,
			'jsdoc/valid-types': 0,
		},
	},

	{
		files: tsFiles,

		rules: {
			'jsdoc/require-param-type': 'off',
			'jsdoc/require-returns-type': 'off',
		},
	},
)
