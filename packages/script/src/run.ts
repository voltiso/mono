// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { context, runScript } from './_bin/v'
import type { Script } from './Script'

export function run(...scripts: Script[]): Promise<void> {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const signal = context.signal!
	return runScript(scripts, [], { signal })
}
