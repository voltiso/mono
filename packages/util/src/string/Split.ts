// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Override } from '~/type'

export interface SplitOptions {
	separator: string
}

export interface DefaultSplitOptions {
	separator: ''
}

export type Split<
	str extends string,
	partialOptions extends Partial<SplitOptions> = {},
> = Split._Rec<str, Override<DefaultSplitOptions, partialOptions>, readonly []>

export namespace Split {
	/** @internal */
	export type _Rec<
		T,
		options extends SplitOptions,
		accumulator extends readonly unknown[],
	> = T extends `${infer A}${options['separator']}${infer B}`
		? _Rec<B, options, readonly [...accumulator, A]>
		: T extends ''
			? accumulator
			: T extends `${infer S}`
				? readonly [...accumulator, S]
				: string extends T
					? readonly [...accumulator, ...string[]]
					: string extends options['separator']
						? readonly [...accumulator, ...string[]]
						: never
}
