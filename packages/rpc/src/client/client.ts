// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { createClassInterface } from '@voltiso/util'
import fetch from 'cross-fetch'

import type { Server, ServerTI } from '~/server/server'

type ClientOptions = {
	log: boolean
}

class _Client<TI extends ClientPathTI> {
	_url: string
	_token = ''
	_options: ClientOptions

	constructor(url: string, options: ClientOptions) {
		this._url = url
		this._options = options
	}

	_PROXY_OBJECT: ClientPath<TI> = new ClientPath(this, [])

	setToken(token: string) {
		this._token = token
	}
}

const Client = createClassInterface(_Client, 'setToken')
type Client<TI extends ClientPathTI> = InstanceType<typeof Client> &
	ClientPath<TI>

type ClientPathTI = {
	serverTI: ServerTI
	path: readonly string[]
}

class _ClientPath<TI extends ClientPathTI> {
	_client: _Client<TI>

	_path: TI['path']

	_PROXY_OBJECT = new Proxy(
		{},
		{
			get: <P extends string>(_t: unknown, p: P) => {
				return new ClientPath(this._client, [...this._path, p]) as unknown
			},
		},
	) as unknown

	constructor(client: _Client<TI>, path: TI['path']) {
		this._client = client
		this._path = path
	}

	async _CALL(...args: unknown[]) {
		// FunctionArgs<ExtractPath<TI['serverTI']['handlers'], TI['path']>>) {
		// console.log('call!', this._url, this._path.join('.'), ...args)

		const body = {
			path: this._path,
			args,
		}

		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
		}

		if (this._client._token)
			headers['Authorization'] = `Bearer ${this._client._token}`

		const message = `rpc.${this._path.join('.')}(${args
			.map(x => JSON.stringify(x))
			.join(', ')})`

		// eslint-disable-next-line no-console
		if (this._client._options.log) console.log(`${message}...`)

		const detail: string[] = []

		try {
			const response = await fetch(this._client._url, {
				method: 'post',
				body: JSON.stringify(body),
				headers,
			})

			detail.push(`HTTP ${response.status}`)

			// eslint-disable-next-line no-magic-numbers
			if (response.status === 200) {
				const data = await response.json()
				return data.result
			}

			try {
				const json = await response.json()
				const error = json?.error

				// console.log('er', error)
				if (error) detail.push(JSON.stringify(error))
			} catch {}
		} catch (error) {
			detail.push(`${error}`)
		}

		const finalMessage = [message, ...detail].join(': ')

		// eslint-disable-next-line no-console
		if (this._client._options.log) console.error(finalMessage)

		throw new Error(finalMessage)
	}
}

const publicFields = [] as const
const ClientPath = createClassInterface(_ClientPath, publicFields)
type ClientPath<TI extends ClientPathTI = ClientPathTI> =
	TI['serverTI']['handlers']

// eslint-disable-next-line etc/no-misused-generics
export function createClient<S extends Server>(
	url: string,
	options: Partial<ClientOptions> = {},
) {
	const finalOptions = {
		log: options.log || false,
	}

	return new Client(url, finalOptions) as Client<
		ClientPathTI & { path: readonly []; serverTI: S['_typeInfo'] }
	>
}
