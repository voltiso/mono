// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Print, Printable } from './Printable.js'

type JoinImpl<Arr, Separator extends Printable> = Arr extends readonly [
	infer H,
	infer HH,
	...infer T,
]
	? `${Print<H>}${Separator}${JoinImpl<readonly [HH, ...T], Separator>}`
	: Arr extends readonly [infer H]
	? Print<H>
	: ''

export type Join<
	T extends readonly Printable[] | Printable,
	Separator extends Printable = '',
> = T extends readonly Printable[] ? JoinImpl<T, Separator> : T

export function join<
	Strings extends readonly string[],
	Separator extends string,
>(strings: Strings, separator: Separator) {
	return strings.join(separator) as Join<Strings, Separator>
}
