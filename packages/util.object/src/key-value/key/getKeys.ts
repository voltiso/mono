import {
	defaultIterationOptions,
	DefaultIterationOptions,
	IterationOptions,
} from "../IterationOptions";
import { StringKeyof } from "./StringKeyof.js";
import { merge, Merge2 } from "../../merge.js";

type GetKeys<Obj, O extends IterationOptions> = O["includeSymbols"] extends true
	? StringKeyof<Obj>[]
	: O["includeSymbols"] extends false
	? Extract<StringKeyof<Obj>, string>[]
	: never;

export function getKeys_<Obj extends object, O extends IterationOptions>(
	obj: Obj,
	options: O
): GetKeys<Obj, O> {
	let r = [] as unknown as GetKeys<Obj, O>;

	if (options.includeNonEnumerable) {
		for (const k of Object.getOwnPropertyNames(obj) as (string & keyof Obj)[]) {
			// if (Object.getOwnPropertyDescriptor(obj, k)?.enumerable)
			r.push(k as never);
		}
	} else r = Object.keys(obj) as never;

	if (options.includeSymbols) {
		for (const k of Object.getOwnPropertySymbols(obj) as (symbol &
			keyof Obj)[]) {
			if (
				options.includeNonEnumerable ||
				Object.getOwnPropertyDescriptor(obj, k)?.enumerable
			) {
				r.push(k as never);
			}
		}
	}

	return r;
}

/**
 * Similar to `Object.keys(obj)`
 *  - Typed more strict than `Object.keys()`
 * */
export function getKeys<Obj extends object>(
	obj: Obj
): GetKeys<Obj, DefaultIterationOptions>;

/**
 * Similar to `Object.keys(obj)`
 *  - Typed more strict than `Object.keys()`
 * @param options configure to enable iteration over symbol properties and/or nonEnumerable properties
 * */
export function getKeys<
	Obj extends object,
	O extends Partial<IterationOptions>
>(
	obj: Obj,
	options: O
): GetKeys<Obj, Merge2<DefaultIterationOptions, O> & IterationOptions>;

export function getKeys<
	Obj extends object,
	O extends Partial<IterationOptions>
>(
	obj: Obj,
	options?: O | undefined
): GetKeys<Obj, Merge2<DefaultIterationOptions, O> & IterationOptions> {
	const myOptions = merge(defaultIterationOptions, options);
	return getKeys_(obj, myOptions as never) as never;
}
