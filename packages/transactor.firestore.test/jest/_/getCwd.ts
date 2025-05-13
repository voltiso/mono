// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as path from 'node:path'

export function getCwd(): string {
	// eslint-disable-next-line unicorn/prefer-module
	return path.resolve(__dirname, '..', '..', 'emulator')
}
