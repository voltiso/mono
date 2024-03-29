// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import { Context } from '@voltiso/context'

import type { RpcRequest } from './RpcRequest'
import type { RpcResponse } from './RpcResponse'

export class RpcServerContext<
	TRequest extends RpcRequest = RpcRequest,
	TResponse extends RpcResponse = RpcResponse,
> {
	_context = new Context<{ request: TRequest; response: TResponse }>()

	get request(): TRequest {
		try {
			return this._context.value.request
		} catch {
			throw new Error('cannot retrieve request object outside RPC context')
		}
	}

	get response(): TResponse {
		try {
			return this._context.value.response
		} catch {
			throw new Error('cannot retrieve request object outside RPC context')
		}
	}
}
