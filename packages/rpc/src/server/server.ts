// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SchemarError } from '@voltiso/schemar'
import * as s from '@voltiso/schemar'
import { CALL, callableInstance } from '@voltiso/util'

import type { Handlers } from '../_shared/Handler'
import type { Request } from './Request'
import type { Response } from './Response'
import { ServerContext } from './ServerContext'
import type { ServerOptions } from './ServerOptions'

function shorten(str: string, maxLength: number) {
	if (str.length <= maxLength) return str
	return `${str.slice(0, Math.max(0, maxLength - 3))}...`
}

export class Server_<
	TRequest extends Request,
	TResponse extends Response,
	THandlers extends Handlers,
> {
	_context: ServerContext<TRequest, TResponse>
	_handlers: THandlers
	_log: boolean
	_logMaxLength: number

	get context() {
		return this._context
	}

	get handlers() {
		return this._handlers
	}

	constructor(options: ServerOptions<TRequest, TResponse, THandlers>) {
		this._context = options.context || new ServerContext<TRequest, TResponse>()
		this._handlers = options.handlers

		this._log = typeof options.log === 'undefined' ? true : options.log

		this._logMaxLength =
			typeof options.logMaxLength === 'undefined'
				? Infinity
				: options.logMaxLength

		// eslint-disable-next-line no-constructor-return
		return callableInstance(this)
	}

	[CALL](request: TRequest, response: TResponse) {
		void this._context._storage.run({ request, response }, async () => {
			const { path, args } = request.body as { path: string[]; args: unknown[] }
			const logName = `rpc.${path.join('.')}(${args
				.map(a => JSON.stringify(a))
				.join(', ')})`
			try {
				s.array(s.string).validate(path)

				// eslint-disable-next-line no-console
				if (this._log) console.log(shorten(logName, this._logMaxLength))

				let handler: any = this._handlers

				for (const p of path) {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
					if (!Object.keys(handler).includes(p))
						throw new Error(`method ${path.join('.')} does not exist`)

					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, security/detect-object-injection, @typescript-eslint/no-unsafe-member-access
					handler = handler[p]
				}

				if (typeof handler !== 'function')
					throw new Error(`method ${path.join('.')} does not exist`)

				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
				const result = await handler(...args)

				if (this._log)
					// eslint-disable-next-line no-console
					console.log(
						shorten(
							`${logName} === ${JSON.stringify(result)}`,
							this._logMaxLength,
						),
					)

				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				response.json({ result })
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(logName, 'throws', error)

				if (error instanceof SchemarError) {
					// eslint-disable-next-line no-magic-numbers
					response.status(400).json({ error })
				} else if (error instanceof Error) {
					// eslint-disable-next-line no-magic-numbers
					response.status(400).json({ error: error.message })
					// eslint-disable-next-line no-magic-numbers
				} else response.status(500).end()
			}
		})
	}
}

//

export type ServerCall<TRequest extends Request, TResponse extends Response> = {
	bivarianceHack(request: TRequest, response: TResponse): void
}['bivarianceHack']

export type Server<
	TRequest extends Request = Request,
	TResponse extends Response = Response,
	THandlers extends Handlers = Handlers,
> = Server_<TRequest, TResponse, THandlers> & ServerCall<TRequest, TResponse>

export const Server = Server_ as ServerConstructor

//

export type ServerConstructor = new <
	TRequest extends Request,
	TResponse extends Response,
	THandlers extends Handlers,
>(
	options: ServerOptions<TRequest, TResponse, THandlers>,
) => Server<TRequest, TResponse, THandlers>
