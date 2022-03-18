export type Head<L extends unknown[]> = L extends [infer H, ...unknown[]] ? H : never
export type Tail<L extends unknown[]> = L extends [unknown, ...infer T] ? T : never

export function head<Arr extends unknown[]>(arr: Arr): Head<Arr> {
	return arr[0] as Head<Arr>
}

export function tail<Arr extends unknown[]>(arr: Arr): Tail<Arr> {
	return arr.slice(1) as Tail<Arr>
}
