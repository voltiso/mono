import type { Print, Printable } from "./Printable.js";

type JoinImpl<Array, Separator extends Printable> = Array extends readonly [
	infer H,
	infer HH,
	...infer T
]
	? `${Print<H>}${Separator}${JoinImpl<readonly [HH, ...T], Separator>}`
	: Array extends readonly [infer H]
	? Print<H>
	: "";

export type Join<
	T extends readonly Printable[] | Printable,
	Separator extends Printable = ""
> = T extends readonly Printable[] ? JoinImpl<T, Separator> : T;

export function join<Strs extends readonly string[], Separator extends string>(
	strs: Strs,
	separator: Separator
) {
	return strs.join(separator) as Join<Strs, Separator>;
}
