type Split_<
	T,
	Separator extends string,
	acc extends readonly unknown[]
> = T extends `${infer A}${Separator}${infer B}`
	? Split_<B, Separator, readonly [...acc, A]>
	: T extends ''
	? acc
	: T extends `${infer S}`
	? readonly [...acc, S]
	: string extends T
	? readonly [...acc, ...string[]]
	: string extends Separator
	? readonly [...acc, ...string[]]
	: never
// : readonly [...acc, T]

export type Split<str extends string, separator extends string = ''> = Split_<
	str,
	separator,
	readonly []
>
