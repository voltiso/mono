// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import fs from 'node:fs/promises'

import { run } from '@voltiso/script'
import type { BuildType } from '@voltiso/script.cmake'
import { installVcpkg } from '@voltiso/script.cmake'

const vcpkgVersion = '2025.04.09'

// export const prepare: Promise<Script> = configure({ type: 'Debug' })

export const clean = 'rimraf build'

// cd build/Debug && GTEST_COLOR=1 ctest --output-on-failure ${target}

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

export const prepare = [
	() => installVcpkg(vcpkgVersion),
	`ln -sf ${dir({ compiler: 'clang-20', buildType: 'Release' })}/compile_commands.json`,
]

async function configure(options: Options) {
	if (await exists(dir(options))) return
	await run(`cmake --preset ${preset(options)}`)
}

//

const testOptions: Options = {
	compiler: 'clang-20',
	buildType: 'Debug',
}

export const test = [
	() => configure(testOptions),
	`cmake --build --preset ${preset(testOptions)} --target voltiso-util-test`,
	`cd ${dir(testOptions)} && GTEST_COLOR=1 ctest --output-on-failure voltiso-util-test`,
]

//

const benchOptions: Options = {
	compiler: 'clang-20',
	// compiler: 'gcc-15',

	// buildType: 'Debug',
	buildType: 'Release',
	// buildType: 'RelWithDebInfo',
}

export const bench = [
	() => configure(benchOptions),
	`cmake --build --preset ${preset(benchOptions)} --target voltiso-util-bench`,
	`${dir(benchOptions)}/util/bench/voltiso-util-bench --benchmark_min_time=0.1s --benchmark_min_warmup_time=0.05`,
]
