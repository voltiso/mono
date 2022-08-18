import type { ServerContext } from './ServerContext'

export type ServerOptions<TRequest, TResponse, THandlers> = {
	context?: ServerContext<TRequest, TResponse> | undefined
	handlers: THandlers
}
