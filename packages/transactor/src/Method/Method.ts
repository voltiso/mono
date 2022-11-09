// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Bivariant } from '@voltiso/util'

import type { $$Doc } from '../Doc'

export type Method<
	Doc extends $$Doc = $$Doc,
	ARGS extends unknown[] = any,
	R = unknown,
> = (this: Doc, ...args: ARGS) => R | PromiseLike<R>

export type MethodNoThis<
	ARGS extends unknown[] = unknown[],
	R = unknown,
> = Bivariant<(...args: ARGS) => R | PromiseLike<R>>

//
