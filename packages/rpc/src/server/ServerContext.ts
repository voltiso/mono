// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { AsyncLocalStorage } from 'node:async_hooks'

export class ServerContext<Request = unknown, Response = unknown> {
	_storage = new AsyncLocalStorage<{request: Request; response: Response}>()

	get request(): Request {
		const store = this._storage.getStore()

		if (!store)
			throw new Error('cannot retrieve request object outside RPC context')

		return store.request
	}

	get response(): Response {
		const store = this._storage.getStore()

		if (!store)
			throw new Error('cannot retrieve request object outside RPC context')

		return store.response
	}
}
