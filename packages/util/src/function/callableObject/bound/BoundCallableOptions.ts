// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { WithCloneFunction } from '~'
import type { _BoundCallable, CALL } from '~/function'

export interface BoundCallableOptions {
	// eslint-disable-next-line etc/no-internal
	call(this: _BoundCallable<this>, ...args: unknown[]): unknown
	shape: Partial<WithCloneFunction>

	/** This overload takes a separate `call` parameter instead */
	[CALL]?: never
}
