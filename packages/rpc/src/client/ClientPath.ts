// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { MaybePromise, Mutable } from '@voltiso/util'
import {
	CALL,
	callableInstance,
	isCallable,
	lazyPromise,
	stringFrom,
	tryGet,
} from '@voltiso/util'
import fetch from 'cross-fetch'

import type { RpcResult } from '~/_shared'

import type { Client } from './Client'

function callLocal(
	clientPath: ClientPath,
	args: unknown[],
): MaybePromise<unknown> | void {
	const options = clientPath._client._options
	const localHandler = tryGet(
		options.localHandlers,
		clientPath._path as never,
	) as unknown

	if (typeof localHandler === 'undefined') return undefined

	if (!isCallable(localHandler))
		throw new Error(
			`[@voltiso/rpc] invalid localHandler ${stringFrom(
				localHandler,
			)} at path ${clientPath._path.join('.')}`,
		)

	return localHandler(...args) as never
}

async function callRemote(clientPath: ClientPath, args: unknown[]) {
	const body = {
		path: clientPath._path,
		args,
	}

	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
	}

	if (clientPath._client.token)
		headers['Authorization'] = `Bearer ${clientPath._client._token}`

	const message = `rpc.${clientPath._path.join('.')}(${args
		.map(x => JSON.stringify(x))
		.join(', ')})`

	// eslint-disable-next-line no-console
	if (clientPath._client._options.log) console.log(`${message}...`)

	const detail: string[] = []

	try {
		const response = await fetch(clientPath._client._url, {
			method: 'post',
			body: JSON.stringify(body),
			headers,
		})

		detail.push(`HTTP ${response.status}`)

		// eslint-disable-next-line no-magic-numbers
		if (response.status === 200) {
			const data = (await response.json()) as { result: unknown }
			// await localPromise
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
	if (clientPath._client.options.log) console.error(finalMessage)

	// await localPromise
	throw new Error(finalMessage)
}

export class ClientPath {
	_client: Client
	_path: readonly string[]

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

	[CALL](...args: unknown[]): RpcResult<unknown> {
		const localPromise = Promise.resolve(callLocal(this, args))
		const remotePromise = callRemote(this, args)

		const call = async () => {
			const [_local, remote] = await Promise.all([localPromise, remotePromise])
			return remote
		}

		// start execution (both local and remote)
		const result = call() as Mutable<RpcResult<unknown>>

		result.local = localPromise
		// result.remote = remotePromise

		result.localOrRemote = lazyPromise(async () => {
			try {
				return await localPromise
			} catch {}

			return remotePromise
		})

		return result
	}
}
