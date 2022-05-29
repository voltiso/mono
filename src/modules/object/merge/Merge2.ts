import { Callable, Newable } from '../../function'
import { _ } from '../flatten'
import { IsOptional } from '../IsOptional'
import { Value } from '../value'
import { SuggestObject } from './SuggestObject'

type Part1<A, B> = {
	[k in keyof A]: k extends keyof B
		?
				| Value<B, k>
				| (k extends keyof A ? IsOptional<B, k, Value<A, k>, never> : never)
		: Value<A, k>
}

type Part2<A, B> = {
	[k in keyof B]: k extends keyof A
		?
				| Value<B, k>
				| (k extends keyof A ? IsOptional<B, k, Value<A, k>, never> : never)
		: Value<B, k>
}

export type Merge2_<A, B> = (A extends Callable | Newable ? A : unknown) &
	(B extends Callable | Newable ? B : unknown) &
	_<Part1<A, B> & Part2<A, B>>

export type Merge2<A extends object, B extends SuggestObject<A>> = Merge2_<A, B>
