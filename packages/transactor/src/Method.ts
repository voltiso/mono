// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IDoc } from './Doc'

/** Strong-typed version - can't use in general contexts */
export type Method<
	Doc extends IDoc = IDoc,
	ARGS extends unknown[] = unknown[],
	R = unknown,
> = (this: Doc, ...args: ARGS) => R | PromiseLike<R>

export type MethodNoThis<ARGS extends unknown[] = unknown[], R = unknown> = (
	...args: ARGS
) => R | PromiseLike<R>

/** Weak-typed version */
export type AnyMethod<
	Doc extends IDoc = IDoc,
	ARGS extends unknown[] = any[],
	R = unknown,
> = Method<Doc, ARGS, R>

// export type AnyMethodNoThis<ARGS extends unknown[] = any[], R = unknown> = MethodNoThis<ARGS, R>
