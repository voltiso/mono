// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { CALL, callableInstance, stringFrom } from '@voltiso/util'
import fetch from 'cross-fetch'

import type { Client } from './Client'

export class ClientPath {
	_client: Client
	_path: readonly string[]

	// get client() {
	// 	return this._client
	// }

	// get path() {
	// 	return this._path
	// }

	constructor(client: Client, path: readonly string[]) {
		this._client = client
		this._path = path

		const callableThis = callableInstance(this)

		// eslint-disable-next-line no-constructor-return
		return new Proxy(callableThis, {
			get(target, p, receiver) {
				if (typeof p !== 'string' || p in target)
					return Reflect.get(target, p, receiver) as never
				else return new ClientPath(client, [...path, p])
			},
		})
	}

	async [CALL](...args: unknown[]) {
		const body = {
			path: this._path,
			args,
		}

		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
		}

		if (this._client.token)
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
				const data = (await response.json()) as { result: unknown }
				return data.result
			}

			try {
				const json = (await response.json()) as { error?: unknown }
				const error = json.error

				// console.log('er', error)
				if (error) detail.push(JSON.stringify(error))
			} catch {}
		} catch (error) {
			const message =
				error instanceof Error
					? `${error.stack || error.message}`
					: `Exotic error: ${stringFrom(error)}`

			detail.push(message)
		}

		const finalMessage = [message, ...detail].join(': ')

		// eslint-disable-next-line no-console
		if (this._client.options.log) console.error(finalMessage)

		throw new Error(finalMessage)
	}
}
