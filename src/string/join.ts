import { Print, Printable } from '../Printable'

type JoinImpl<Array, Separator extends Printable = ''> = Array extends readonly [infer H, infer HH, ...infer T]
	? `${Print<H>}${Separator}${JoinImpl<readonly [HH, ...T]>}`
	: Array extends readonly [infer H]
	? Print<H>
	: ''

export type Join<
	T extends readonly Printable[] | Printable,
	Separator extends Printable = ''
> = T extends readonly Printable[] ? JoinImpl<T, Separator> : T

export const join = <Strs extends readonly string[], Separator extends string>(strs: Strs, separator: Separator) =>
	strs.join(separator) as Join<Strs, Separator>
