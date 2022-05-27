export type Head<L extends readonly unknown[]> = L extends readonly [
	infer H,
	...unknown[]
]
	? H
	: never

export function head<Arr extends readonly unknown[]>(arr: Arr): Head<Arr> {
	return arr[0] as Head<Arr>
}
