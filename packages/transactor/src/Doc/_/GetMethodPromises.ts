// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Bivariant } from '@voltiso/util'

import type { $$DocTI, DocTI } from '~/Doc'
import type { $$DocRelatedLike, GetDocTI } from '~/DocRelated'
import type { DocTagLike } from '~/DocTypes'

/** @inline */
export type Promisify<F> = F extends (...args: any) => PromiseLike<unknown>
	? Bivariant<F>
	: F extends (...args: infer Args) => infer R
	? Bivariant<(...args: Args) => PromiseLike<R>>
	: never

/** @inline */
export type GetMethodPromises<R extends $$DocRelatedLike> =
	GetMethodPromises.ByTI<GetDocTI<R>>

export namespace GetMethodPromises {
	/** Simplest way */
	export type ByMethods<methods> = methods extends any
		? {
				[k in keyof methods]: Promisify<methods[k]>
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
