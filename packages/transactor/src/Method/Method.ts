// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Bivariant } from '@voltiso/util'

import type { $$Doc, IDoc } from '../Doc'

export type Method<
	Doc extends $$Doc = IDoc,
	ARGS extends unknown[] = any,
	R = unknown,
> = (this: Doc, ...args: ARGS) => R | PromiseLike<R>

export type MethodNoThis<
	ARGS extends unknown[] = unknown[],
	R = unknown,
> = Bivariant<(...args: ARGS) => R | PromiseLike<R>>

//
