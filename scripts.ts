// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

//! shared scripts - run using `v` binary from `@voltiso/script`

/* eslint-disable sonarjs/no-duplicate-string */

import * as fs from 'node:fs'
import * as fsPromises from 'node:fs/promises'
import * as os from 'node:os'
import * as path from 'node:path'

const packageJson = JSON.parse(
	// eslint-disable-next-line n/no-sync
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

//

const numCpuThreads = os.cpus().length
void numCpuThreads // unused

function turboAllPackages(
	scriptName: string,
	options?: { concurrency?: number },
) {
	const turboOptions = {} as Record<string, number | string>

	if (options?.concurrency !== undefined) {
		turboOptions['concurrency'] = Math.round(options.concurrency)
	}

	const turboOptionsStr = Object.entries(turboOptions)
		.map(([key, value]) => `--${key} ${value}`)
		.join(' ')

	return `${finalEnvStr} pnpm -w exec turbo run ${turboOptionsStr} ${scriptName} --output-logs=new-only`
}

//!
//! Workspace-level

export const prepareWorkspace = `pnpm -w exec turbo run build:cjs --filter=//^... --output-logs=new-only`

export const devWorkspace = turboAllPackages('dev', { concurrency: 1_000 })

export const lintTscWorkspace = turboAllPackages('lint:tsc')

export const lintEslintWorkspace = turboAllPackages('lint:eslint', {
	concurrency: 3, // ! high memory usage - eslint can crash
	// concurrency: numCpuThreads * 0.5,
})

export const lintWorkspace = [lintTscWorkspace, lintEslintWorkspace]

export const depcheckWorkspace = turboAllPackages('depcheck')

export const testWorkspace = turboAllPackages('test')

export const buildCjsWorkspace = turboAllPackages('build:cjs')
export const buildEsmWorkspace = turboAllPackages('build:esm')

export const buildWorkspace = [buildCjsWorkspace, buildEsmWorkspace]

/** No point using it directly */
export const installWorkspace = 'pnpm install'

export const checkWorkspace = [
	installWorkspace,
	// turboAllPackages('fix:prettier'),
	buildWorkspace,
	depcheckWorkspace,
	testWorkspace,
	lintWorkspace,
]

//!
//! Per-package

export const devCjs =
	'cross-env VOLTISO_STRIP_DISABLE=1 tsc -p tsconfig.build.cjs.json --watch --noUnusedLocals false --noUnusedParameters false'

export const devEsm =
	'cross-env VOLTISO_STRIP_DISABLE=1 tsc -p tsconfig.build.esm.json --watch --noUnusedLocals false --noUnusedParameters false'

export const dev = devCjs

//

export const build = [installWorkspace, turbo('build:esm', 'build:cjs')]

export const buildEsm = [
	'rimraf dist/esm',
	'tsc -b tsconfig.build.esm.json',
	`echo '{"type":"module"}' > dist/esm/package.json`,
]

export const buildCjs = [
	'rimraf dist/cjs',
	'tsc -b tsconfig.build.cjs.json',
	`echo '{"type":"commonjs"}' > dist/cjs/package.json`,
]

export const lint = [installWorkspace, turbo('lint:tsc', 'lint:eslint')]

export const lintEslint =
	'cross-env FULL=1 NODE_OPTIONS=--max_old_space_size=24000 eslint --max-warnings=0 .'

export const lintTsc = 'tsc -b'

export const fix = [installWorkspace, turbo('fix:eslint', 'fix:prettier')]
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

	async () => {
		try {
			// eslint-disable-next-line security/detect-non-literal-fs-filename
			await fsPromises.stat(`../${packageJson.name}.test`)
		} catch {
			return
			// return `echo no ${packageJson.name}.test package`
		}

		// eslint-disable-next-line consistent-return
		return `pnpm -w exec turbo run --filter=${
			packageJson.name || '//'
		}.test test --output-logs=new-only`
	},
]
