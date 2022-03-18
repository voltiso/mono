export type Includes<Str extends string, Substr extends string> = string extends Str
	? boolean
	: string extends Substr
	? boolean
	: Str extends `${string}${Substr}${string}`
	? true
	: false
