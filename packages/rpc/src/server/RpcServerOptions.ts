// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { RpcOptions } from '~/_shared'
import { defaultRpcOptions } from '~/_shared'

import type { RpcRequest } from './RpcRequest'
import type { RpcResponse } from './RpcResponse'
import type { RpcServerContext } from './RpcServerContext'

export interface RpcServerOptions<
	THandlers,
	TRequest extends RpcRequest,
	TResponse extends RpcResponse,
> extends RpcOptions {
	//
	context: RpcServerContext<TRequest, TResponse>
	handlers: THandlers
}

export const defaultRpcServerOptions = {
	...defaultRpcOptions,
}

export type RpcServerOptionsInput<
	THandlers,
	TRequest extends RpcRequest,
	TResponse extends RpcResponse,
> = { handlers: THandlers } & Partial<
	RpcServerOptions<THandlers, TRequest, TResponse>
>
