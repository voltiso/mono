// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export const jsFiles = ['*.js', '*.jsx', '*.cjs', '*.cjsx', '*.mjs', '*.mjsx']
export const tsFiles = ['*.ts', '*.tsx', '*.cts', '*.ctsx', '*.mts', '*.mtsx']

export const codeFiles = [...jsFiles, ...tsFiles]

export const codeInsideMdFiles = ['**/*.md/*.ts']

export const codeFilesNoMd = {
	files: codeFiles,
	excludedFiles: codeInsideMdFiles,
}

export const jsonFiles = ['*.json', '*.jsonc', '*.json5']

export const testFiles = ['*.test.*', '*.spec.*']
