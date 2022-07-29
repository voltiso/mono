// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineConfig } from './defineConfig'

interface PackageJson {
	readonly peerDependencies: Record<string, string>
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
	try {
		// eslint-disable-next-line n/global-require, n/no-missing-require, unicorn/prefer-module
		return require('../../package.json') as never
	} catch {
		// eslint-disable-next-line n/global-require, unicorn/prefer-module
		return require('../package.json') as never
	}
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

	// eslintIntegration: true, // unknown option?

	/**
	 * ! Obvious 😉 !
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
	plugins: Object.keys(getPackageJson().peerDependencies)
		.filter(
			dep =>
				dep.startsWith('@prettier/plugin') || dep.startsWith('prettier-plugin'),
		)
		// eslint-disable-next-line import/no-dynamic-require, unicorn/prefer-module, @typescript-eslint/no-unsafe-return, n/global-require
		.map(moduleId => require(moduleId)),

	overrides: [
		{
			files: [
				'.browserslistrc',
				'.npmrc',
				'.yarnrc',
				'.*shrc',
				'.gitignore',
				'.prettierignore',
				'.editorconfig',
			],

			options: {
				parser: 'sh',
			},
		},

		{
			files: ['*.json', '*.jsonc', '*.json5'],

			options: {
				parser: 'json',
			},
		},

		/** `json-stringify` makes arrays multi-line - consistent with `pnpm` output 😎 */
		{
			files: ['package.json'],

			options: {
				parser: 'json-stringify',
			},
		},
	],
})

export type PrettierBaseConfig = typeof basePrettierConfig
