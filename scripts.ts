// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

//! shared scripts - run using `v` binary from `@voltiso/script`

/* eslint-disable sonarjs/no-duplicate-string */

import * as fs from 'node:fs'
import * as path from 'node:path'

const packageJson = JSON.parse(
	// eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync
	fs.readFileSync(path.join(process.cwd(), 'package.json')).toString(),
) as { name?: string }

//

function turbo(...scriptNames: string[]) {
	return `pnpm -w exec turbo run --filter=${
		packageJson.name || '//'
	} ${scriptNames.join(' ')} --output-logs=new-only`
}

function turboDependents(...scriptNames: string[]) {
	return `pnpm -w exec turbo run --filter=...^${
		packageJson.name || '//'
	} ${scriptNames.join(' ')} --output-logs=new-only`
}

function turboAllPackages(...scriptNames: string[]) {
	return `pnpm -w exec turbo run ${scriptNames.join(
		' ',
	)} --output-logs=new-only`
}

//!
//! Workspace-level

export const prepareWorkspace = `pnpm -w exec turbo run build:cjs --filter=//^... --output-logs=new-only`

export const checkWorkspace = [
	'prepareWorkspace',
	// turboAllPackages('fix:prettier'),
	turboAllPackages('build:cjs'),
	turboAllPackages('depcheck', 'test', 'build:esm', 'lint:eslint', 'lint:tsc'),
]

//!
//! Per-package

export const dev =
	'cross-env ASSERTOR_NO_STRIP=1 tsc -p tsconfig.build.cjs.json --watch --noUnusedLocals false --noUnusedParameters false'

export const build = turbo('build:esm', 'build:cjs')
export const buildEsm = ['rimraf dist/esm', 'tsc -b tsconfig.build.esm.json']
export const buildCjs = ['rimraf dist/cjs', 'tsc -b tsconfig.build.cjs.json']

export const lint = turbo('lint:tsc', 'lint:eslint')
export const lintEslint = 'cross-env FULL=1 eslint --max-warnings=0 .'
export const lintTsc = 'tsc -b'

export const fix = turbo('fix:eslint', 'fix:prettier')
export const fixPrettier = 'prettier --write --loglevel error .'
export const fixEslint = 'eslint --fix --max-warnings=0 .'

export const depcheck = 'depcheck'

export const typecov = [
	'type-coverage --project tsconfig.build.cjs --update || true',
]

export const traceRun = [
	'rimraf traceDir',
	'tsc --generateTrace traceDir | gnomon',
	'analyze-trace traceDir',
	'simplify-trace-types traceDir/types.json traceDir/types-simplified.json',
	'code traceDir/types-simplified.json',
]
export const trace = turbo('trace:run')

export const clean = 'rimraf node_modules dist'

// export const testDependents = turbo('...^test')

export const prepublishOnly = [
	'prepareWorkspace',

	turbo(
		'build:esm',
		'build:cjs',
		'test',
		'typecov',
		'fix:prettier',
		'lint:eslint',
		'lint:tsc',
		'depcheck',
	),

	turboDependents('test'),
]

export const prepublishOnlyFast = [
	'prepareWorkspace',

	turbo(
		'build:esm',
		'build:cjs',
		'test',
		'typecov',
		'fix:prettier',
		// 'lint:eslint',
		'lint:tsc',
		'depcheck',
	),

	`pnpm -w exec turbo run --filter=${
		packageJson.name || '//'
	}.test test --output-logs=new-only`,
]

// /** Lint */
// export const lint = parallel('depcheck', 'prettier', 'tsclint', 'eslint')
// // export const depcheck = 'depcheck'
// export const prettier = 'prettier --check .'
// export const eslint = 'eslint .'
// export const tsclint = 'tsc -b'

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
