export type Tail<L extends unknown[]> = L extends [unknown, ...infer T] ? T : never

export function tail<Arr extends unknown[]>(arr: Arr): Tail<Arr> {
	return arr.slice(1) as Tail<Arr>
}
