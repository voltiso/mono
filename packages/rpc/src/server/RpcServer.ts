// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable es-x/no-class-instance-fields */
/* eslint-disable sonarjs/cyclomatic-complexity */
/* eslint-disable @typescript-eslint/no-magic-numbers */

import { SchemarError } from '@voltiso/schemar'
import * as s from '@voltiso/schemar'
import { $AssumeType, BoundCallable, CALL } from '@voltiso/util'

import { shorten } from '~/_shared'

import type { Handlers } from '../_shared/Handler'
import type { RpcRequest } from './RpcRequest'
import type { RpcResponse } from './RpcResponse'
import { RpcServerContext } from './RpcServerContext'
import type {
	RpcServerOptions,
	RpcServerOptionsInput,
} from './RpcServerOptions'
import { defaultRpcServerOptions } from './RpcServerOptions'

//

/** @internal */
export class _RpcServer<
	THandlers extends Handlers = {},
	TRequest extends RpcRequest = RpcRequest,
	TResponse extends RpcResponse = RpcResponse,
> {
	readonly options: RpcServerOptions<THandlers, TRequest, TResponse>

	get context(): RpcServerContext<TRequest, TResponse> {
		return this.options.context
	}

	get handlers(): typeof this.options.handlers {
		return this.options.handlers
	}

	constructor(
		optionsInput: RpcServerOptionsInput<THandlers, TRequest, TResponse>,
	) {
		const options = { ...defaultRpcServerOptions, ...optionsInput }
		if (!options.context)
			options.context = new RpcServerContext<TRequest, TResponse>()

		$AssumeType<{ context: RpcServerContext }>(options)

		this.options = options

		// eslint-disable-next-line no-constructor-return
		return BoundCallable(this)
	}

	[CALL](request: TRequest, response: TResponse): void {
		// console.log('RPC server call')

		void this.options.context._context.run({ request, response }, async () => {
			// console.log('RPC server call - in context')

			// eslint-disable-next-line destructuring/no-rename
			const { path, args: serializedArgs } = request.body as {
				path: string[]
				args: unknown[]
			}

			const args = this.options.serializer
				? serializedArgs.map(serializedArg =>
						this.options.serializer?.deserialize(serializedArg),
					)
				: serializedArgs

			const logName = `rpc.${path.join('.')}(${args
				.map(a => JSON.stringify(a))
				.join(', ')})`

			try {
				s.array(s.string).validate(path)

				if (this.options.log)
					// eslint-disable-next-line no-console
					console.log(shorten(logName, this.options.logMaxLength))

				let handler: any = this.options.handlers

				for (const p of path) {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
					if (!Object.keys(handler).includes(p))
						throw new Error(`method ${path.join('.')} does not exist`)

					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
					handler = handler[p]
				}

				if (typeof handler !== 'function')
					throw new Error(`method ${path.join('.')} does not exist`)

				// eslint-disable-next-line @typescript-eslint/no-unsafe-call
				const result = (await handler(...args)) as unknown

				if (this.options.log)
					// eslint-disable-next-line no-console
					console.log(
						shorten(
							`${logName} === ${JSON.stringify(result)}`,
							this.options.logMaxLength,
						),
					)

				const serializedResult = this.options.serializer
					? this.options.serializer.serialize(result)
					: result

				response.json({ result: serializedResult })
			} catch (error) {
				// // eslint-disable-next-line no-console
				// console.error(logName, 'throws', error) // ! SHOULD BE LOGGED ?

				if (this.options.serializer)
					response
						.status(400)
						.json({ error: this.options.serializer.serialize(error) })
				else if (error instanceof SchemarError) {
					response.status(400).json({ error })
				} else if (error instanceof Error) {
					response.status(400).json({ error: error.toString() })
					// response.status(400).json({
					// 	error: omitUndefinedAndNull({
					// 		...error,
					// 		name: error.name,
					// 		message: error.message,
					// 		cause: error.cause,
					// 		// stack: error.stack,
					// 	}),
					// })
				} else response.status(500).end()
			}
		})
	}
}

//

export type RpcServer<
	THandlers extends Handlers = {},
	TRequest extends RpcRequest = RpcRequest,
	TResponse extends RpcResponse = RpcResponse,
> = _RpcServer<THandlers, TRequest, TResponse> &
	_RpcServer<THandlers, TRequest, TResponse>[CALL]

export const RpcServer = _RpcServer as unknown as RpcServerConstructor

export interface RpcServerConstructor {
	new <
		THandlers extends Handlers,
		TRequest extends RpcRequest,
		TResponse extends RpcResponse,
	>(
		optionsInput: RpcServerOptionsInput<THandlers, TRequest, TResponse>,
	): RpcServer<THandlers, TRequest, TResponse>
}
