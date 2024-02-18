// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { RpcResult } from './RpcResult'

export type PromisifyHandlers<H> = H extends (...args: infer Args) => infer R
	? (...args: Args) => RpcResult<Awaited<R>>
	: H extends object
		? { [k in keyof H]: PromisifyHandlers<H[k]> }
		: never
