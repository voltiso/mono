// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable sort-keys-fix/sort-keys-fix */

import { defineConfig } from './defineConfig.js'

type PackageJson = {
	readonly dependencies: Record<string, string>
}

/**
 * Require `package.json` at runtime.
 *
 * @example
 *
 * ```ts
 * const { name, version, dependencies } = getPackageJson()
 * ```
 *
 * @returns PackageJson
 */
function getPackageJson(): PackageJson {
	// eslint-disable-next-line n/no-missing-require, unicorn/prefer-module
	return require('../../package') as never
}

/** ! Code must be CLEAN for readability and DX 👌 */
export const basePrettierConfig = defineConfig({
	semi: false, // cleaner
	singleQuote: true, // cleaner
	jsxSingleQuote: true, // cleaner
	arrowParens: 'avoid', // cleaner
	bracketSpacing: true,
	bracketSameLine: false, // easy to move around multi-line
	trailingComma: 'all', // easy to move around multi-line

	requirePragma: false,
	insertPragma: false,

	// Markdown
	proseWrap: 'always',

	htmlWhitespaceSensitivity: 'ignore',
	singleAttributePerLine: true,

	vueIndentScriptAndStyle: true,

	embeddedLanguageFormatting: 'auto',

	eslintIntegration: true,

	/**
	 * ! Obvious !
	 *
	 * - Tab is semantically correct for indenting things
	 * - Use spaces for alignment
	 */
	useTabs: true,
	tabWidth: 2,

	/**
	 * ? not sure about this one
	 *
	 * - It really depends on context
	 * - `as-needed` seems to work best most of cases
	 */
	quoteProps: 'as-needed',

	endOfLine: 'lf', // definitely Unix-style
	printWidth: 80, // 80 is standard - recommended by prettier

	tsdoc: true,

	/** Workaround for pnpm, see also @see https://github.com/prettier/prettier/issues/8474 */
	plugins: Object.keys(getPackageJson().dependencies)
		.filter(
			dep =>
				dep.startsWith('@prettier/plugin') || dep.startsWith('prettier-plugin'),
		)
		// eslint-disable-next-line import/no-dynamic-require, unicorn/prefer-module, security/detect-non-literal-require, @typescript-eslint/no-unsafe-return
		.map(moduleId => require(moduleId)),

	overrides: [
		{
			files: [
				'.browserslistrc',
				'.npmrc',
				'.yarnrc',
				'.*shrc',
				'.gitignore',
				'.editorconfig',
			],

			options: {
				parser: 'sh',
			},
		},

		{
			files: ['*.json', '*.jsonc', '*.json5', '*.jsonx'],

			options: {
				parser: 'json',
			},
		},
	],
})

export type PrettierBaseConfig = typeof basePrettierConfig
