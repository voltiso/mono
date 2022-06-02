import { _ } from '../flatten'
import { VOmit_ } from '../omit'

export type Merge2Simple_<A, B> = _<VOmit_<A, keyof B> & B>

export type Merge2Simple<A extends object, B extends object> = Merge2Simple_<
	A,
	B
>
