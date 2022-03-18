export type Split<T, Separator extends string = ''> = string extends T
	? string[]
	: string extends Separator
	? string[]
	: T extends `${infer A}${Separator}${infer B}`
	? [A, ...Split<B, Separator>]
	: T extends ''
	? []
	: [T]
