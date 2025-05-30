// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import fs from 'node:fs'
import * as path from 'node:path'

// import packageJson from '../package.json'
import { defineConfig } from './defineConfig'

interface PackageJson {
	readonly dependencies: Record<string, string>
	readonly peerDependencies: Record<string, string>
}

// ...

function getPackageJson(): PackageJson {
	// eslint-disable-next-line unicorn/prefer-module
	const dirname = __dirname

	let packageJsonBuffer

	try {
		// eslint-disable-next-line n/no-sync
		packageJsonBuffer = fs.readFileSync(
			// eslint-disable-next-line sonarjs/no-duplicate-string
			path.join(dirname, '..', '..', 'package.json'),
		)
	} catch {
		// for test env
		// eslint-disable-next-line n/no-sync
		packageJsonBuffer = fs.readFileSync(
			path.join(dirname, '..', 'package.json'),
		)
	}

	return JSON.parse(packageJsonBuffer as never) as never
}

function getDependencies(): Record<string, string> {
	const packageJson = getPackageJson()
	return { ...packageJson.dependencies, ...packageJson.peerDependencies }
}

const pluginNames = Object.keys(getDependencies()).filter(
	dep => dep.startsWith('@prettier/plugin') || dep.includes('prettier-plugin'),
)

// const plugins = pluginNames

const resolve =
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore `import.meta.url`
	// eslint-disable-next-line unicorn/no-negated-condition, unicorn/prefer-module, @typescript-eslint/unbound-method, n/no-unsupported-features/node-builtins
	typeof require !== 'undefined' ? require.resolve : import.meta.resolve // createRequire(import.meta.url)

// this is required, because prettier plugins installed here locally

function resolveWithoutFileProtocol(name: string): string {
	const resolved = resolve(name)
	const prefix = 'file://'
	if (resolved.startsWith(prefix)) {
		return resolved.slice(prefix.length)
	}
	return resolved
}

const plugins = pluginNames.map(name => resolveWithoutFileProtocol(name))
// console.log('prettier plugins', plugins)

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
	singleAttributePerLine: false, // good for lots of short attributes

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

	/** Workaround for pnpm, @see https://github.com/prettier/prettier/issues/8474 */
	plugins,

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

		/**
		 * `json-stringify` makes arrays multi-line - consistent with `pnpm` output
		 * 😎
		 */
		{
			files: ['package.json'],

			options: {
				parser: 'json-stringify',
				useTabs: false,
			},
		},

		/**
		 * Note that `.frag` files are recognized as JavaScript files by default.
		 * Add the following to your Prettier configuration to format them as GLSL.
		 */
		{ files: ['*.frag'], options: { parser: 'glsl-parser' } },
	],
})

export type PrettierBaseConfig = typeof basePrettierConfig
