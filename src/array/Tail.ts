export type Tail<L extends readonly unknown[]> = L extends [unknown, ...infer T]
	? T
	: L extends readonly [unknown, ...infer T]
	? readonly [...T]
	: never

export function tail<Arr extends readonly unknown[]>(arr: Arr): Tail<Arr> {
	// eslint-disable-next-line no-magic-numbers
	return arr.slice(1) as Tail<Arr>
}
