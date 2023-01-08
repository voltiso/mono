// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Bivariant } from '@voltiso/util'

import type { InferTI } from '~/CollectionRef'
import type { $$DocTI, DocTI } from '~/Doc'
import type { $$DocRelatedLike, GetDocTI } from '~/DocRelated'
import type { AnyDoc, DocTagLike } from '~/DocTypes'
import type { MethodNoThis } from '~/Method'

/** @inline */
export type Promisify<F> = F extends (...args: any) => PromiseLike<unknown>
	? Bivariant<F>
	: F extends (...args: infer Args) => infer R
	? Bivariant<(...args: Args) => PromiseLike<R>>
	: never

/** @inline */
export type GetMethodPromises<R extends $$DocRelatedLike> = R extends AnyDoc
	? Record<string, MethodNoThis>
	: // : GetMethodPromises.ByTI<GetDocTI<R>>
	  GetMethodPromises.ByTI<InferTI<R>> // ! INFER slow

export namespace GetMethodPromises {
	/** Simplest way */
	export type ByMethods<methods> = methods extends any
		? {
				[k in keyof methods]: Promisify<OmitThisParameter<methods[k]>>
		  }
		: never

	/** Almost as simple as {@link ByMethods} */
	export type ByTI<TI extends $$DocTI> = TI extends DocTI
		? ByMethods<TI['methods']>
		: never

	export type ByTag<tag extends DocTagLike> = {
		[k in keyof GetDocTI.ByTag<tag>['methods']]: Promisify<
			GetDocTI.ByTag<tag>['methods'][k]
		>
	}
}
