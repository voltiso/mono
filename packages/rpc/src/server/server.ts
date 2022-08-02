// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SchemarError } from '@voltiso/schemar'
import * as s from '@voltiso/schemar'
import type { Callable, Interface, Unpack } from '@voltiso/util'
import { createClassInterface, deepMerge } from '@voltiso/util'
import type {
	Request as ExpressRequest,
	Response as ExpressResponse,
} from 'express'
import { AsyncLocalStorage } from 'node:async_hooks'

type Handler = Callable
type Handlers = { [k: string]: Handlers | Handler }

// interface AnyServerTI {
// 	request: any
// 	response: any
// 	handlers: any
// }

type Request = {
	body: unknown
}

type Response = {
	json(json: unknown): Response
	status(httpCode: number): Response
	end(): void
}

export interface ServerTI {
	// extends AnyServerTI {
	req: Request
	res: Response
	handlers: object
}

interface Context<TI extends ServerTI> {
	req: TI['req']
	res: TI['res']
}

type Promisify<H> = H extends (...args: any[]) => PromiseLike<any>
	? H
	: H extends (...args: infer Args) => infer R
	? (...args: Args) => Promise<R>
	: H extends object
	? { [k in keyof H]: Promisify<H[k]> }
	: never

class _Server<TI extends ServerTI> {
	_ = {
		handlers: {},
	} as {
		handlers: Handlers
		context: ServerContext<TI>
	}

	get context() {
		return this._.context
	}

	constructor(serverContext?: ServerContext<TI>) {
		this._.context = serverContext || new ServerContext<TI>()
	}

	handlers<HH extends Handlers>(
		handlers: HH,
	): Server<TI & { handlers: Promisify<HH> }> {
		this._.handlers = deepMerge(this._.handlers, handlers) as Handlers
		return this as unknown as Server<TI & { handlers: Promisify<HH> }>
	}

	_CALL(req: TI['req'], res: TI['res']) {
		void this._.context._.storage.run({ req, res }, async () => {
			const { path, args } = req.body as { path: string[]; args: unknown[] }
			const logName = `rpc.${path.join('.')}(${args
				.map(a => JSON.stringify(a))
				.join(', ')})`
			try {
				s.array(s.string).validate(path)

				// eslint-disable-next-line no-console
				console.log(logName)

				let h: any = this._.handlers

				for (const p of path) {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
					if (!Object.keys(h).includes(p))
						throw new Error(`method ${path.join('.')} does not exist`)

					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, security/detect-object-injection, @typescript-eslint/no-unsafe-member-access
					h = h[p]
				}

				if (typeof h !== 'function')
					throw new Error(`method ${path.join('.')} does not exist`)

				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
				const result = await h(...args)

				// eslint-disable-next-line no-console
				console.log(logName, '===', JSON.stringify(result))
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				res.json({ result })
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(logName, 'throws', error)

				if (error instanceof SchemarError) {
					// eslint-disable-next-line no-magic-numbers
					res.status(400).json({ error })
				} else if (error instanceof Error) {
					// eslint-disable-next-line no-magic-numbers
					res.status(400).json({ error: error.message })
					// eslint-disable-next-line no-magic-numbers
				} else res.status(500).end()
			}
		})
	}
}

const publicFields = ['handlers'] as const

export const Server = createClassInterface(_Server, publicFields)
export type Server<TI extends ServerTI = ServerTI> = Interface<
	_Server<TI>,
	Unpack<typeof publicFields>
> & {
	_typeInfo: TI
}

export class ServerContext<TI extends ServerTI> {
	_ = {
		storage: new AsyncLocalStorage<Context<TI>>(),
	} as {
		storage: AsyncLocalStorage<Context<TI>>
		typeInfo: TI
	}

	get req(): TI['req'] {
		const store = this._.storage.getStore()

		if (!store)
			throw new Error('cannot retrieve request object outside RPC context')

		return store.req
	}

	get res(): TI['res'] {
		const store = this._.storage.getStore()

		if (!store)
			throw new Error('cannot retrieve request object outside RPC context')

		return store.res
	}
}

export function createServerContext<
	// eslint-disable-next-line etc/no-misused-generics
	_Request = ExpressRequest,
	// eslint-disable-next-line etc/no-misused-generics
	_Response = ExpressResponse,
>() {
	return new ServerContext<
		ServerTI & {
			req: _Request
			res: _Response
		}
	>()
}

export function createServer(): Server<
	ServerTI & { req: ExpressRequest; res: ExpressResponse }
>
export function createServer<SC extends ServerContext<ServerTI>>(
	serverContext: SC,
): Server<SC['_']['typeInfo']>
export function createServer(serverContext?: ServerContext<ServerTI>) {
	return new Server(serverContext)
}
