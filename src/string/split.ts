import { Assert } from '../assert'
import { IsEqual } from '../IsEqual'

export type Split<T, Separator extends string = ''> = string extends T
	? string[]
	: string extends Separator
	? string[]
	: T extends `${infer A}${Separator}${infer B}`
	? [A, ...Split<B, Separator>]
	: T extends ''
	? []
	: [T]

Assert<IsEqual<Split<'asd/sdf/dfg', '/'>, ['asd', 'sdf', 'dfg']>>()
Assert<IsEqual<Split<string, '/'>, string[]>>()
