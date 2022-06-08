import { _ } from '../flatten'
import { OmitSignatures, OmitSimple_ } from '../omit'
import { SuggestObject } from './SuggestObject'

/** Discards index signatures */
export type Merge2Simple_<A, B> = Impl<OmitSignatures<A>, OmitSignatures<B>>

/** Discards index signatures */
export type Merge2Simple<
	A extends object,
	B extends SuggestObject<A>
> = Merge2Simple_<A, B>

//

type Impl<A, B> = _<OmitSimple_<A, keyof B> & B>
