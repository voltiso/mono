import { _ } from '../flatten'
import { OmitIndexSignatures, OmitSimple_ } from '../omit'
import { SuggestObject } from './SuggestObject'

export type Merge2Simple_<A, B> = Impl<
	OmitIndexSignatures<A>,
	OmitIndexSignatures<B>
>

export type Merge2Simple<
	A extends object,
	B extends SuggestObject<A>
> = Merge2Simple_<A, B>

//

type Impl<A, B> = _<OmitSimple_<A, keyof B> & B>
