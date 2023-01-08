// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export const jsFiles = [
	'*.js',
	'*.jsx',
	'*.cjs',
	'*.cjsx',
	'*.mjs',
	'*.mjsx',
] as const

export const tsFiles = [
	'*.ts',
	'*.tsx',
	'*.cts',
	'*.ctsx',
	'*.mts',
	'*.mtsx',
] as const

export const codeFiles = [...jsFiles, ...tsFiles] as const

export const filesInsideMd = '**/*.md/*.*' as const

export const codeFilesNoMd = {
	files: codeFiles,
	excludedFiles: filesInsideMd,
} as const

export const jsonFiles = ['*.json', '*.jsonc', '*.json5'] as const

export const testFiles = ['*.test.*', '*.spec.*'] as const
