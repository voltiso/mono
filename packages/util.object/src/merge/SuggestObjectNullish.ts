import { AlsoAccept } from "../../misc/AlsoAccept.js";
import { Nullish } from "../../null.js";

type SuggestObjectNullish__<T> = {
	[k in keyof T]?: T[k] | AlsoAccept<unknown>; // auto-complete doesn't work for the nested value :(
};

export type SuggestObjectNullish_<T> =
	| SuggestObjectNullish__<Extract<T, object>>
	| AlsoAccept<object | Nullish>;

export type SuggestObjectNullish<T extends object | Nullish> =
	SuggestObjectNullish_<T>;
