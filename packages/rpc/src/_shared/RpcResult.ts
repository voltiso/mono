// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { LazyPromiseLike } from '@voltiso/util'

export type RpcResult<T> = Promise<T> & {
	readonly local: Promise<T>
	// remote: Promise<T> // self

	readonly localOrRemote: LazyPromiseLike<T>
}
