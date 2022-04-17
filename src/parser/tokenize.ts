type ApplyLast<Res extends string[], Last extends string> = Last extends '' ? Res : [...Res, Last]

type Tokenize_<Res extends string[], Last extends string, S> = S extends `${infer H}${infer T}`
	? ' \t\n\r\v\f' extends `${string}${H}${string}`
		? Tokenize_<Res, Last, T>
		: '123456789!&|^()' extends `${string}${H}${string}`
		? Tokenize_<[...ApplyLast<Res, Last>, H], '', T>
		: Tokenize_<Res, `${Last}${H}`, T>
	: ApplyLast<Res, Last>

export type Tokenize<S> = Tokenize_<[], '', S>
