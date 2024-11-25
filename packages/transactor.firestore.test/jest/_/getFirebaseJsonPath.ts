// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as path from 'node:path'

import { getCwd } from './getCwd'

export function getFirebaseJsonPath(params: { port: number }): string {
	const cwd = getCwd()

	return path.join(cwd, `firebase-${params.port}.json`)
}
