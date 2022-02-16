import { Assert } from '../assert'

type ApplyLast<Res extends string[], Last extends string> = Last extends '' ? Res : [...Res, Last]
type Tokenize_Acc<Res extends string[], Last extends string, S> = S extends `${infer H}${infer T}`
	? ' \t\n\r\v\f' extends `${string}${H}${string}`
		? Tokenize_Acc<Res, Last, T>
		: '123456789!&|^()' extends `${string}${H}${string}`
		? Tokenize_Acc<[...ApplyLast<Res, Last>, H], '', T>
		: Tokenize_Acc<Res, `${Last}${H}`, T>
	: ApplyLast<Res, Last>

export type Tokenize<S> = Tokenize_Acc<[], '', S>

Assert<Tokenize<'isString 1 & !isString 2'>, ['isString', '1', '&', '!', 'isString', '2']>()
