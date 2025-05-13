// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Handlers, RpcOptions } from '../_shared'
import { defaultRpcOptions } from '../_shared'

export interface RpcClientOptions<THandlers extends Handlers>
	extends RpcOptions {
	//
	localHandlers?: THandlers | undefined
}

export const defaultRpcClientOptions = {
	...defaultRpcOptions,
}
