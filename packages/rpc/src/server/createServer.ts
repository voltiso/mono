// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Handlers } from '~/_shared/Handler'

import type { Request } from './Request'
import type { Response } from './Response'
import { Server } from './server'
import type { ServerOptions } from './ServerOptions'

export function createServer<
	TRequest extends Request,
	TResponse extends Response,
	THandlers extends Handlers,
>(options: ServerOptions<TRequest, TResponse, THandlers>) {
	return new Server(options)
}
