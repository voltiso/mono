// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { MaybePromise } from '@voltiso/util'

export type PromisifyHandlers<H> = H extends (...args: infer Args) => infer R
	? (...args: Args) => Promise<Awaited<R>> & {
			local: MaybePromise<Awaited<R>>
			localOrRemote: MaybePromise<Awaited<R>>
	  }
	: H extends object
	? { [k in keyof H]: PromisifyHandlers<H[k]> }
	: never
