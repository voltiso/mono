// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { AsyncLocalStorage } from 'node:async_hooks'

export function haveAsyncHooks(): boolean {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	return typeof AsyncLocalStorage?.constructor?.name === 'string'
}
