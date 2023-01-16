// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
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

const env = {
	FORCE_COLOR: 1 as const,
}

const envStr = Object.entries(env)
	.map(([key, value]) => `${key}=${value}`)
	.join(' ')

const finalEnvStr = `cross-env ${envStr}`

//

function turbo(...scriptNames: string[]) {
	return `${finalEnvStr} pnpm -w exec turbo run --filter=${
		packageJson.name || '//'
	} ${scriptNames.join(' ')} --output-logs=new-only`
}

function turboDependents(...scriptNames: string[]) {
	return `${finalEnvStr} pnpm -w exec turbo run --filter=...^${
		packageJson.name || '//'
	} ${scriptNames.join(' ')} --output-logs=new-only`
}

function turboAllPackages(...scriptNames: string[]) {
	return `${finalEnvStr} pnpm -w exec turbo run ${scriptNames.join(
		' ',
	)} --output-logs=new-only`
}

//!
//! Workspace-level

export const prepareWorkspace = `pnpm -w exec turbo run build:cjs --filter=//^... --output-logs=new-only`

export const checkWorkspace = [
	'pnpm install',
	// turboAllPackages('fix:prettier'),
	turboAllPackages('build:cjs'),
	turboAllPackages('build:esm'),
	turboAllPackages('depcheck'),
	turboAllPackages('test'),
	turboAllPackages('lint:tsc'),
	turboAllPackages('lint:eslint'),
]

//!
//! Per-package

export const dev =
	'cross-env VOLTISO_STRIP_DISABLE=1 tsc -p tsconfig.build.cjs.json --watch --noUnusedLocals false --noUnusedParameters false'

export const build = ['pnpm install', turbo('build:esm', 'build:cjs')]
export const buildEsm = ['rimraf dist/esm', 'tsc -b tsconfig.build.esm.json']
export const buildCjs = ['rimraf dist/cjs', 'tsc -b tsconfig.build.cjs.json']

export const lint = ['pnpm install', turbo('lint:tsc', 'lint:eslint')]
export const lintEslint = 'cross-env FULL=1 eslint --max-warnings=0 .'
export const lintTsc = 'tsc -b'

export const fix = ['pnpm install', turbo('fix:eslint', 'fix:prettier')]
export const fixPrettier = 'prettier --write --loglevel error .'
export const fixEslint = 'eslint --fix --max-warnings=0 .'

export const depcheck = 'depcheck'

export const typecov = [
	'type-coverage --project tsconfig.build.cjs --update || true',
]

export const traceRun = [
	'rimraf traceDir',
	'tsc --generateTrace traceDir | gnomon',
	'simplify-trace-types traceDir/types.json traceDir/types-simplified.json',
]

export const traceAnalyze = [
	// 'reset',
	'analyze-trace traceDir',
	'code traceDir/types-simplified.json',
]

export const trace = ['reset', turbo('trace:run'), traceAnalyze]

export const clean = 'rimraf node_modules dist'

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
		'compatDirs',
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
