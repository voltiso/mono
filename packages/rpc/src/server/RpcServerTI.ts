// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Handlers } from '../_shared/Handler'
import type { RpcRequest } from './RpcRequest'
import type { RpcResponse } from './RpcResponse'

export interface RpcServerTI {
	req: RpcRequest
	res: RpcResponse
	handlers: Handlers
}
