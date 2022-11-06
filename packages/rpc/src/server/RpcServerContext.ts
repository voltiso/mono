// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { AsyncLocalStorage } from 'node:async_hooks'

import type { RpcRequest } from './RpcRequest'
import type { RpcResponse } from './RpcResponse'

export class RpcServerContext<
	TRequest extends RpcRequest = RpcRequest,
	TResponse extends RpcResponse = RpcResponse,
> {
	_storage = new AsyncLocalStorage<{ request: TRequest; response: TResponse }>()

	get request(): TRequest {
		const store = this._storage.getStore()

		if (!store)
			throw new Error('cannot retrieve request object outside RPC context')

		return store.request
	}

	get response(): TResponse {
		const store = this._storage.getStore()

		if (!store)
			throw new Error('cannot retrieve request object outside RPC context')

		return store.response
	}
}
