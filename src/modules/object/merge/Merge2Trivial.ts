import { _ } from '../flatten'
import { OmitTrivial_ } from '../omit'
import { SuggestObject } from './SuggestObject'

/** Does not work with index signatures */
export type Merge2Trivial_<A, B> = _<OmitTrivial_<A, keyof B> & B>

/** Does not work with index signatures */
export type Merge2Trivial<
	A extends object,
	B extends SuggestObject<A>
> = Merge2Trivial_<A, B>
