// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// ! shared scripts - run using `v` binary from `@voltiso/script`

import * as fs from 'node:fs'
import { glob } from 'node:fs/promises'
import * as path from 'node:path'

import { parallel, run } from '@voltiso/script'

const packageJson = JSON.parse(
	fs.readFileSync(path.join(process.cwd(), 'package.json')).toString(),
) as { name?: string; private?: boolean }

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

// function turboDependents(...scriptNames: string[]) {
// 	return `${finalEnvStr} pnpm -w exec turbo run --filter=...^${
// 		packageJson.name ?? '//'
// 	} ${scriptNames.join(' ')} --output-logs=new-only`
// }

//

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

export const allBuild = turboAllPackages('build')
export const allCheck = turboAllPackages('check')

export const workspacePrepare = `pnpm -w exec turbo run build --filter=//^... --output-logs=new-only`

// !
// ! Per-package

export const build = [
	parallel('buildEsm', 'buildCjs', 'compatDirsWrite', 'typecov'),
]

export const buildEsm = () => {
	const tsConfig = 'tsconfig.build.esm.json'
	if (!fs.existsSync(path.join(process.cwd(), tsConfig))) return []
	return [
		'rimraf dist/esm',
		`tspc -b ${tsConfig}`,
		`echo '{"type":"module"}' > dist/esm/package.json`,
	]
}

export const buildCjs = () => {
	const tsConfig = 'tsconfig.build.cjs.json'
	if (!fs.existsSync(path.join(process.cwd(), tsConfig))) return []
	return [
		'rimraf dist/cjs',
		`tspc -b ${tsConfig}`,
		`echo '{"type":"commonjs"}' > dist/cjs/package.json`,
	]
}

export const compatDirsWrite = 'pnpm exec v compatDirs write'

export const typecov = [
	'type-coverage --project tsconfig.build.esm --update || true',
]

//

export const check = parallel(
	'checkKnip',
	'checkAttw',
	'checkBiome',
	'checkTsc',
	'test',
)

export const checkKnip = `pnpm -w exec knip --workspace ${packageJson.name}`
export const checkAttw = () => {
	if (!packageJson.private) return 'attw --pack'
	return null
}
export const checkBiome = 'biome check'
export const checkTsc = () => {
	if (!fs.existsSync(path.join(process.cwd(), 'tsconfig.json'))) return null
	return 'tsc -b'
}

//

export const clean = 'rimraf node_modules dist'

//

export const dev = 'devEsm'

export const devCjs =
	'cross-env VOLTISO_STRIP_DISABLE=1 tsc -p tsconfig.build.cjs.json --watch --noUnusedLocals false --noUnusedParameters false'

export const devEsm =
	'cross-env VOLTISO_STRIP_DISABLE=1 tsc -p tsconfig.build.esm.json --watch --noUnusedLocals false --noUnusedParameters false'

//

// export const traceRun = [
// 	'rimraf traceDir',
// 	'tsc --generateTrace traceDir | gnomon',
// 	'simplify-trace-types traceDir/types.json traceDir/types-simplified.json',
// ]

// export const traceAnalyze = [
// 	// 'reset',
// 	'analyze-trace traceDir',
// 	'code traceDir/types-simplified.json',
// ]

// export const trace = ['reset', turbo('trace:run'), traceAnalyze]

export async function runTestPackages(): Promise<void> {
	const name = packageJson.name?.split('/')[1]

	for await (const pkg of glob(`../${name}.*test*`)) {
		await run(
			`pnpm -w exec turbo run --filter=./packages/${pkg.slice(3)} check --output-logs=new-only`,
		)
	}
}

export const prepublishOnly = [
	'workspacePrepare',
	turbo('build', 'check'),
	// make sure compat dirs are created
	// (e.g. for `util` package, where they are not during build)
	compatDirsWrite,
	runTestPackages,
	// turboDependents('test'), // ! slow
]

//

export const test = 'vitest run --passWithNoTests --silent'

// // must not include `"` (or escape them)
// const testNodeOptions = [
// 	`--experimental-vm-modules`, // no longer required?
// 	'--import tsx',
// ]
// const testNodeOptionsStr = testNodeOptions.join(' ')
// // default per-package test command
// export const test = `cross-env NODE_OPTIONS="${testNodeOptionsStr}" jest --silent --passWithNoTests`
