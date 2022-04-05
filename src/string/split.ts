export type Split<T, Separator extends string = ''> = string extends T
	? readonly string[]
	: string extends Separator
	? readonly string[]
	: T extends `${infer A}${Separator}${infer B}`
	? readonly [A, ...Split<B, Separator>]
	: T extends ''
	? readonly []
	: readonly [T]
