import { Assert } from '../assert'
import { IsEqual } from '../IsEqual'

export type Includes<Str extends string, Substr extends string> = string extends Str
	? boolean
	: string extends Substr
	? boolean
	: Str extends `${string}${Substr}${string}`
	? true
	: false

Assert<Includes<'qwerty', 'wer'>>()
Assert<Includes<'qwerty', 'werx'>, false>()
Assert<IsEqual<Includes<string, 'asd'>, boolean>>()
Assert<IsEqual<Includes<'asd', string>, boolean>>()
