// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Script } from './Script'

export function isParallelScript(x: unknown): x is Script.Parallel {
	return Array.isArray((x as Script.Parallel | null)?.parallel)
}

/** Create a script that executes given child-scripts in parallel */
export function parallel(...scripts: Script[]): Script.Parallel {
	return { parallel: scripts }
}
