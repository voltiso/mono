// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import fs from 'node:fs/promises'
import path from 'node:path'
import { run } from '@voltiso/script'
import type { BuildType } from '@voltiso/script.cmake'
import { installVcpkg } from '@voltiso/script.cmake'

const vcpkgVersion = '2026.02.27'

export const clean = 'rimraf build vcpkg compile_commands.json'

interface Options {
	compiler: string
	buildType: BuildType
}

function preset(options: Options) {
	return `${options.compiler}_${options.buildType}`
}

function dir(options: Options) {
	return `build/${preset(options)}`
}

export async function exists(fileName: string): Promise<boolean> {
	try {
		await fs.access(fileName)
		return true
	} catch {
		return false
	}
}

//

export const prepublishOnly = [
	() => installVcpkg(vcpkgVersion),
	`ln -sf ${dir({ compiler: 'clang-22', buildType: 'Release' })}/compile_commands.json`,
]

async function configure(options: Options) {
	if (await exists(path.join(dir(options), 'build.ninja'))) return
	await run(`cmake --preset ${preset(options)}`)
}

//

const testOptions: Options = {
	compiler: 'clang-22',
	buildType: 'Debug',
}

export const test = [
	() => 'prepublishOnly', // ! fast enough?
	() => configure(testOptions),
	`cmake --build --preset ${preset(testOptions)} --target voltiso-util-test`,
	`cd ${dir(testOptions)} && GTEST_COLOR=1 ctest --output-on-failure voltiso-util-test`,
]

export const check = test

//

const benchOptions: Options = {
	compiler: 'clang-22',
	// compiler: 'gcc-15',

	// buildType: 'Debug',
	buildType: 'Release',
	// buildType: 'RelWithDebInfo',
}

export const bench = [
	() => 'prepublishOnly', // ! fast enough?
	() => configure(benchOptions),
	`cmake --build --preset ${preset(benchOptions)} --target voltiso-util-bench`,
	[
		`setarch $(uname -m) -R`,
		// 'taskset -c 2', // hardcode single code
		`${dir(benchOptions)}/util/bench/voltiso-util-bench`,
		'--benchmark_min_time=0.1s',
		// '--benchmark_min_warmup_time=0.05s',
		// '--benchmark_repetitions=10 --benchmark_enable_random_interleaving=true --benchmark_report_aggregates_only=true',
	].join(' '),
]
