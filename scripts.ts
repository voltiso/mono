// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

//! Per-package shared scripts - run using `v` binary from `@voltiso/script`

/** Build */
export const build = parallel('esm', 'cjs')
export const esm = 'tsc -b config/tsconfig.build.esm.json'
export const cjs = 'tsc -b config/tsconfig.build.cjs.json'

/** Lint */
export const lint = parallel('depcheck', 'prettier', 'tsclint', 'eslint')
// export const depcheck = 'depcheck'
export const prettier = 'prettier --check .'
export const eslint = 'eslint .'
export const tsclint = 'tsc -b'

/** Clean */
export const clean = 'rimraf dist'

/** `type-coverage` */
export const typecov = [
	'type-coverage --project config/tsconfig.build.esm --update',
	'prettier ./package.json --write', // fix indent
]

/** Publish */
export const prepublish = [
	'clean',
	parallel('build', 'test', 'lint', 'typecov'),
]
