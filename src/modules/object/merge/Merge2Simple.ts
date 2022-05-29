import { _ } from '../flatten'
import { VOmit } from '../omit'

export type Merge2Simple<A extends object, B extends object> = _<
	VOmit<A, keyof B> & B
>
