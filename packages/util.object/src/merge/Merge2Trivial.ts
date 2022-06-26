import { _ } from "../flatten.js";
import { OmitTrivial_ } from "../pick-omit/omit.js";
import { SuggestObject } from "./SuggestObject.js";

/** Does not work with index signatures */
export type Merge2Trivial_<A, B> = _<OmitTrivial_<A, keyof B> & B>;

/** Does not work with index signatures */
export type Merge2Trivial<
	A extends object,
	B extends SuggestObject<A>
> = Merge2Trivial_<A, B>;
