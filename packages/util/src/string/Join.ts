// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Override } from '~/type'

import type { Print, Printable } from './Printable'

export interface JoinOptions {
	/**
	 * Separator
	 *
	 * @defaultValue `''` (empty string)
	 */
	separator: Printable
}

export interface DefaultJoinOptions extends JoinOptions {
	separator: ''
}

export const defaultJoinOptions: DefaultJoinOptions = {
	separator: '',
}

//

export type Join<
	T extends readonly Printable[] | Printable,
	partialOptions extends Partial<JoinOptions> = {},
> = Join_<T, partialOptions>

export type Join_<T, partialOptions = {}> =
	partialOptions extends Partial<JoinOptions>
		? T extends readonly Printable[]
			? Join._Rec<T, Override<DefaultJoinOptions, partialOptions>>
			: T
		: never

export namespace Join {
	export type _Rec<Arr, options extends JoinOptions> = Arr extends readonly [
		infer H,
		infer HH,
		...infer T,
	]
		? `${Print<H>}${options['separator']}${_Rec<readonly [HH, ...T], options>}` // ! TODO: tail recursion
		: Arr extends readonly [infer H]
			? Print<H>
			: ''
}

declare module '~/TypeAliases-augmentation' {
	interface TypeAliases2<_1, _2> {
		Join: Join_<_1, _2>
	}

	interface TypeAliases1<_1> {
		JoinWithDots: Join_<_1, { separator: '.' }>
		JoinWithSlashes: Join_<_1, { separator: '/' }>
	}
}

//

export function join<
	Strings extends readonly string[],
	PartialOptions extends Partial<JoinOptions>,
>(
	strings: Strings,
	partialOptions: PartialOptions,
): Join<Strings, PartialOptions> {
	const options = { ...defaultJoinOptions, ...partialOptions }
	return strings.join(options.separator) as never
}
