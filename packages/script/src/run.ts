// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { runScript } from './runScript'
import type { Script } from './Script'

export function run(...scripts: Script[]): Promise<void> {
	return runScript(scripts, [])
}
