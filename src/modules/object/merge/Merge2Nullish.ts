import { Nullish } from '../../null'
import { PartialIfNullish_ } from '../map'
import { Merge2_ } from './Merge2'
import { SuggestObjectNullish } from './SuggestObjectNullish'

export type Merge2Nullish_<A, B> = Merge2_<
	PartialIfNullish_<A>,
	PartialIfNullish_<B>
>

export type Merge2Nullish<
	A extends object | Nullish,
	B extends SuggestObjectNullish<A> | Nullish
> = Merge2Nullish_<A, B>
