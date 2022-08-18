// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

//! shared scripts - run using `v` binary from `@voltiso/script`

import { getPackageJsonCachedSync } from '@voltiso/util.node'

//!
//! Workspace-level

const corePackages = ['util', 'eslint-config', 'eslint-config-fast']

export const prepareWorkspace = `turbo run build:cjs ${corePackages
	.map(packageName => `--filter=...@voltiso/${packageName}`)
	.join(' ')}`

export const uninstallWorkspace = [turbo('uninstall'), 'uninstall']

//!
//! Per-package

const packageJson = getPackageJsonCachedSync(process.cwd())

function turbo(...scriptNames: string[]) {
	return `pnpm -w exec turbo run --filter ${
		packageJson.name
	} ${scriptNames.join(' ')}`
}

export const build = turbo('build:esm', 'build:cjs')

export const buildEsm = ['rimraf dist/esm', 'tsc -b tsconfig.build.esm.json']
export const buildCjs = ['rimraf dist/cjs', 'tsc -b tsconfig.build.cjs.json']

export const fixPrettier = 'prettier --write .'

export const depcheck = 'depcheck'

export const lintTsc = 'tsc -b'
export const lintEslint = 'cross-env FULL=1 eslint --max-warnings=0 .'

export const typecov = [
	'type-coverage --project tsconfig.build.esm --update',
	'prettier --write ./package.json',
]

export const uninstall = 'rimraf node_modules'

export const prepublishOnly = [
	turbo(
		'build:esm',
		'build:cjs',
		'test',
		'typecov',
		'fix:prettier',
		'lint:eslint',
		'lint:tsc',
	),
	turbo('depcheck'),
]

// /** Lint */
// export const lint = parallel('depcheck', 'prettier', 'tsclint', 'eslint')
// // export const depcheck = 'depcheck'
// export const prettier = 'prettier --check .'
// export const eslint = 'eslint .'
// export const tsclint = 'tsc -b'

// /** Clean */
// export const clean = 'rimraf dist'

// /** `type-coverage` */
// export const typecov = [
// 	'type-coverage --project config/tsconfig.build.esm --update',
// 	'prettier ./package.json --write', // fix indent
// ]

// /** Publish */
// export const prepublish = [
// 	'clean',
// 	parallel('build', 'test', 'lint', 'typecov'),
// ]
