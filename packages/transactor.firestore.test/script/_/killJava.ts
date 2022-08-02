// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { exec } from 'node:child_process'
import * as util from 'node:util'

const execAsync = util.promisify(exec)

export async function killJava() {
	await execAsync('pkill java')
}
