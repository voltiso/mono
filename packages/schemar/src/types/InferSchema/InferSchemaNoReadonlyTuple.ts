// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsAlmostSame, Newable } from '@voltiso/util'

import type {
	$$InferableObject,
	$$Schemable,
	GetObject$,
	InferableLiteral,
	InferableReadonlyTuple,
	Instance$,
	Literal$,
	MutableTuple$,
	NonNullish,
} from '~'

import type { $$Schema, Schema$ } from '../Schema'

//

/** Explicit infer */
export type InferSchema$NoReadonlyTuple_<T> = [T] extends [never]
	? never
	: $$Schemable extends T
		? Schema$
		: T extends InferableLiteral
			? Literal$<T>
			: T extends Newable
				? Instance$<T>
				: T extends $$Schema
					? T
					: T extends InferableReadonlyTuple
						? MutableTuple$<[...T]>
						: IsAlmostSame<T, {}> extends true
							? NonNullish
							: T extends $$InferableObject
								? GetObject$<T>
								: never

/** Explicit infer */
export type InferSchema$NoReadonlyTuple<T extends $$Schemable> =
	InferSchema$NoReadonlyTuple_<T>
