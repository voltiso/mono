// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { WithCloneFunction } from '~/clone'
import type { _BoundCallable } from '~/function'

export interface BoundCallableOptions {
	// eslint-disable-next-line etc/no-internal
	call(this: _BoundCallable<this>, ...args: unknown[]): unknown
	shape: Partial<WithCloneFunction>
}
