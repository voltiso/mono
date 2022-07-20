// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

type Split_<
	T,
	Separator extends string,
	accumulator extends readonly unknown[],
> = T extends `${infer A}${Separator}${infer B}`
	? Split_<B, Separator, readonly [...accumulator, A]>
	: T extends ''
	? accumulator
	: T extends `${infer S}`
	? readonly [...accumulator, S]
	: string extends T
	? readonly [...accumulator, ...string[]]
	: string extends Separator
	? readonly [...accumulator, ...string[]]
	: never
// : readonly [...acc, T]

export type Split<str extends string, separator extends string = ''> = Split_<
	str,
	separator,
	readonly []
>
