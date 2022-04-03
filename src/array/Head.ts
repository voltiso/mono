export type Head<L extends unknown[]> = L extends [infer H, ...unknown[]] ? H : never

export function head<Arr extends unknown[]>(arr: Arr): Head<Arr> {
	return arr[0] as Head<Arr>
}
