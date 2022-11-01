// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Bivariant } from '@voltiso/util'

import type { $$DocRelated, GetDocTI } from '~/Doc'

/** @inline */
export type Promisify<F> = F extends (...args: any) => PromiseLike<unknown>
	? Bivariant<F>
	: F extends (...args: infer Args) => infer R
	? Bivariant<(...args: Args) => PromiseLike<R>>
	: never

/** @inline */
export type GetMethodPromises<R extends $$DocRelated> = {
	[k in keyof GetDocTI<R>['methods']]: Promisify<GetDocTI<R>['methods'][k]>
}
