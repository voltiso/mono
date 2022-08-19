// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ServerContext } from './ServerContext'

export type ServerOptions<TRequest, TResponse, THandlers> = {
	context?: ServerContext<TRequest, TResponse> | undefined
	handlers: THandlers
}
