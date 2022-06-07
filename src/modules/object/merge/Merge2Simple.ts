import { _ } from '../flatten'
import { VOmit_ } from '../omit'
import { SuggestObject } from './SuggestObject'

export type Merge2Simple_<A, B> = _<VOmit_<A, keyof B> & B>

export type Merge2Simple<
	A extends object,
	B extends SuggestObject<A>
> = Merge2Simple_<A, B>
