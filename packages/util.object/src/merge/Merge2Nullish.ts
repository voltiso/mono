import { Nullish } from "../../null.js";
import { PartialIfNullish_ } from "../map.js";
import { Merge2_ } from "./Merge2.js";
import { SuggestObjectNullish } from "./SuggestObjectNullish.js";

export type Merge2Nullish_<A, B> = Merge2_<
	PartialIfNullish_<A>,
	PartialIfNullish_<B>
>;

export type Merge2Nullish<
	A extends object | Nullish,
	B extends SuggestObjectNullish<A> | Nullish
> = Merge2Nullish_<A, B>;
