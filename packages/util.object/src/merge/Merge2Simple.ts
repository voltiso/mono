import { _ } from "../flatten.js";
import { OmitSignatures, OmitSimple_ } from "../pick-omit/omit.js";
import { SuggestObject } from "./SuggestObject.js";

/** Discards index signatures */
export type Merge2Simple_<A, B> = Impl<OmitSignatures<A>, OmitSignatures<B>>;

/** Discards index signatures */
export type Merge2Simple<
	A extends object,
	B extends SuggestObject<A>
> = Merge2Simple_<A, B>;

//

type Impl<A, B> = _<OmitSimple_<A, keyof B> & B>;
