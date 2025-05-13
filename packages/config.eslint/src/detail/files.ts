// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export const jsFiles = [
	'**/*.js',
	'**/*.jsx',
	'**/*.cjs',
	'**/*.cjsx',
	'**/*.mjs',
	'**/*.mjsx',
]

export const tsFiles = [
	'**/*.ts',
	'**/*.tsx',
	'**/*.cts',
	'**/*.ctsx',
	'**/*.mts',
	'**/*.mtsx',
]

export const codeFiles = [...jsFiles, ...tsFiles]

export const filesInsideMd = ['**/*.md/*.*']

export const codeFilesNoMd = {
	files: codeFiles,
	ignores: filesInsideMd,
}

export const jsonFiles = ['**/*.json', '**/*.jsonc', '**/*.json5']

export const testFiles = ['**/*.test.*', '**/*.spec.*']
