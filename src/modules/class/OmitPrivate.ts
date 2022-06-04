export type OmitPrivate<Obj extends object> = {
	[k in keyof Obj as k extends `_${string}` ? never : k]: Obj[k]
} & (Obj extends (...args: infer Args) => infer Result
	? (...args: Args) => Result
	: unknown) &
	(Obj extends new (...args: infer Args) => infer Result
		? new (...args: Args) => Result
		: Obj extends abstract new (...args: infer Args) => infer Result
		? abstract new (...args: Args) => Result
		: unknown)
