// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Handlers, PromisifyHandlers } from '~/_shared'

import type { RpcClientOptions } from './RpcClientOptions'
import { defaultRpcClientOptions } from './RpcClientOptions'
import { RpcClientPath } from './RpcClientPath'

/** @internal */
export class _RpcClient<THandlers extends Handlers> {
	_url: string
	_token = ''
	_options: RpcClientOptions<THandlers>

	get url() {
		return this._url
	}

	get token() {
		return this._token
	}

	get options() {
		return this._options
	}

	constructor(
		url: string,
		partialOptions: Partial<RpcClientOptions<THandlers>> = {},
	) {
		const options = { ...defaultRpcClientOptions, ...partialOptions }
		this._url = url
		this._options = options

		const clientPath = new RpcClientPath(this as never, [])

		// eslint-disable-next-line no-constructor-return
		return new Proxy(this, {
			get(target, p, receiver) {
				if (p in target) return Reflect.get(target, p, receiver) as never
				else return Reflect.get(clientPath, p) as never
			},
		})
	}

	setToken(token: string) {
		this._token = token
	}
}

export type RpcClient<THandlers extends Handlers = Handlers> =
	// eslint-disable-next-line etc/no-internal
	_RpcClient<THandlers> & PromisifyHandlers<THandlers>

// eslint-disable-next-line etc/no-internal
export const RpcClient = _RpcClient as RpcClientConstructor

//

export type RpcClientConstructor = new <THandlers extends Handlers>(
	url: string,
	options?: Partial<RpcClientOptions<THandlers>> | undefined,
) => RpcClient<THandlers>
