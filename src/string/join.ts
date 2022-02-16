import { Assert } from '../assert'
import { IsEqual } from '../IsEqual'
import { Print, Printable } from '../Printable'

type JoinImpl<Array, Separator extends Printable = ''> = Array extends [infer H, infer HH, ...infer T]
	? `${Print<H>}${Separator}${JoinImpl<[HH, ...T]>}`
	: Array extends [infer H]
	? Print<H>
	: ''

export type Join<T extends Printable[] | Printable, Separator extends Printable = ''> = T extends Printable[]
	? JoinImpl<T, Separator>
	: T

export const join = <Strs extends string[], Separator extends string>(strs: Strs, separator: Separator) =>
	strs.join(separator) as Join<Strs, Separator>

Assert<IsEqual<Join<['asd', 'sdf'], '/'>, 'asd/sdf'>>()
