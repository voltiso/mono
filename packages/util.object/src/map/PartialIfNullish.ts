/* eslint-disable @typescript-eslint/ban-types */
import { Nullish } from "../../null.js";
import { strictNullChecks } from "../../compiler-options.js";
import { VPartial } from "./VPartial.js";

type ExcludedPartial<T> = VPartial<Exclude<T, Nullish>>;

type NonNeverPartial<T> = ExcludedPartial<T> extends never
	? {}
	: ExcludedPartial<T>;

/** requires `strictNullChecks` */
export type PartialIfNullish_<O> = strictNullChecks extends true
	? null extends O
		? NonNeverPartial<O>
		: undefined extends O
		? NonNeverPartial<O>
		: O
	: O;

/** requires `strictNullChecks` */
export type PartialIfNullish<O extends object | Nullish> = PartialIfNullish_<O>;
