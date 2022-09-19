// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Handlers, PromisifyHandlers } from '~/_shared'

import type { ClientOptions } from './ClientOptions'
import { ClientPath } from './ClientPath'

export class ClientImpl<THandlers extends Handlers> {
	_url: string
	_token = ''
	_options: ClientOptions<THandlers>

	get url() {
		return this._url
	}

	get token() {
		return this._token
	}

	get options() {
		return this._options
	}

	constructor(url: string, options: ClientOptions<THandlers>) {
		this._url = url
		this._options = options

		const clientPath = new ClientPath(this as never, [])

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

export type Client<THandlers extends Handlers = Handlers> =
	ClientImpl<THandlers> & PromisifyHandlers<THandlers>

export const Client = ClientImpl as ClientConstructor

//

export type ClientConstructor = new <THandlers extends Handlers>(
	url: string,
	options: ClientOptions<THandlers>,
) => Client<THandlers>
