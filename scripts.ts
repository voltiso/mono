// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// ! shared scripts - run using `v` binary from `@voltiso/script`

/* eslint-disable sonarjs/no-duplicate-string */

import * as fs from 'node:fs'
// eslint-disable-next-line n/no-unsupported-features/node-builtins
import { glob } from 'node:fs/promises'
import * as path from 'node:path'

import { run } from '@voltiso/script'

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
		packageJson.name ?? '//'
	} ${scriptNames.join(' ')} --output-logs=new-only`
}

function turboDependents(...scriptNames: string[]) {
	return `${finalEnvStr} pnpm -w exec turbo run --filter=...^${
		packageJson.name ?? '//'
	} ${scriptNames.join(' ')} --output-logs=new-only`
}

//

// const numCpuThreads = os.cpus().length
// void numCpuThreads // unused

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

// !
// ! Workspace-level

export const prepareWorkspace = `pnpm -w exec turbo run build:esm --filter=//^... --output-logs=new-only`

export const devWorkspace = turboAllPackages('dev', { concurrency: 1_000 })

export const lintTscWorkspace = turboAllPackages('lint:tsc')

export const lintEslintWorkspace = turboAllPackages('lint:eslint', {
	concurrency: 3, // ! high memory usage - eslint can crash
	// concurrency: numCpuThreads * 0.5,
})

export const lintWorkspace = [lintTscWorkspace, lintEslintWorkspace]

export const depcheckWorkspace = turboAllPackages('depcheck')
export const areTheTypesWrongWorkspace = turboAllPackages('areTheTypesWrong')

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
	areTheTypesWrongWorkspace,
	testWorkspace,
	lintWorkspace,
]

// !
// ! Per-package

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

//

export const lint = [
	installWorkspace,
	turbo('fix:prettier', 'depcheck', 'lint:tsc', 'lint:eslint'),
]

export const fixPrettier = 'prettier --write --loglevel error .'
export const depcheck = 'depcheck'
export const lintTsc = 'tsc -b'
export const lintEslint =
	'cross-env TIMING=1 NODE_OPTIONS=--max_old_space_size=24000 FORCE_COLOR=1 eslint --max-warnings=0 .'

//

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

export const areTheTypesWrong = 'attw --pack'

export const prepublishOnly = [
	'prepareWorkspace',

	turbo(
		'build:esm',
		'build:cjs',
		'test',
		//
		'fix:prettier',
		'depcheck',
		'lint:tsc',
		'lint:eslint',
		//
		'typecov',
		'compatDirs',
	),

	areTheTypesWrong,

	turboDependents('test'),
]

export async function runTestPackages(): Promise<void> {
	const name = packageJson.name?.split('/')[1]

	// eslint-disable-next-line es-x/no-async-iteration
	for await (const pkg of glob(`../${name}.*test*`)) {
		await run(
			`pnpm -w exec turbo run --filter=./packages/${pkg.slice(3)} test lint:tsc lint:eslint --output-logs=new-only`,
		)
	}
}

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
		'compatDirs', // ! added - should it be here?
	),

	areTheTypesWrong,

	runTestPackages,
]
