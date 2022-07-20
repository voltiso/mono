// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

type ApplyLast<Result extends string[], Last extends string> = Last extends ''
	? Result
	: [...Result, Last]

type Tokenize_<
	Result extends string[],
	Last extends string,
	S,
> = S extends `${infer H}${infer T}`
	? ' \t\n\r\v\f' extends `${string}${H}${string}`
		? Tokenize_<Result, Last, T>
		: '123456789!&|^()' extends `${string}${H}${string}`
		? Tokenize_<[...ApplyLast<Result, Last>, H], '', T>
		: Tokenize_<Result, `${Last}${H}`, T>
	: ApplyLast<Result, Last>

export type Tokenize<S> = Tokenize_<[], '', S>
