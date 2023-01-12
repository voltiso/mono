// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Callable, Newable } from '~/function'

import type { _ } from '../flatten'
import type { IsOptional } from '../IsOptional'
import type { Value } from '../key-value'
import type { SuggestObject } from './Suggest'

/** @inline */ type Part1<A, B> = {
	[k in keyof A]: k extends keyof B
		?
				| Value<B, k>
				| (k extends keyof A ? IsOptional<B, k, Value<A, k>, never> : never)
		: Value<A, k>
}

/** @inline */ type Part2<A, B> = {
	[k in keyof B]: k extends keyof A
		?
				| Value<B, k>
				| (k extends keyof A ? IsOptional<B, k, Value<A, k>, never> : never)
		: Value<B, k>
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
