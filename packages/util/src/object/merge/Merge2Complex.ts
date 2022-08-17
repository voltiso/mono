// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _, Callable, IsOptional_, Newable, Value_ } from '~'

import type { SuggestObject } from './SuggestObject'

/** @inline */ type Part1<A, B> = {
	[k in keyof A]: k extends keyof B
		?
				| Value_<B, k>
				| (k extends keyof A ? IsOptional_<B, k, Value_<A, k>, never> : never)
		: Value_<A, k>
}

/** @inline */ type Part2<A, B> = {
	[k in keyof B]: k extends keyof A
		?
				| Value_<B, k>
				| (k extends keyof A ? IsOptional_<B, k, Value_<A, k>, never> : never)
		: Value_<B, k>
}

/** @inline */ export type Merge2Complex_<A, B> = (A extends Callable | Newable
	? A
	: unknown) &
	(B extends Callable | Newable ? B : unknown) &
	_<Part1<A, B> & Part2<A, B>>

/** @inline */ export type Merge2Complex<
	A extends object,
	B extends SuggestObject<A>,
> = Merge2Complex_<A, B>
