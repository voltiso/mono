// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type Head<L extends readonly unknown[]> = L extends readonly [
	infer H,
	...unknown[],
]
	? H
	: never

export function head<Arr extends readonly unknown[]>(array: Arr): Head<Arr> {
	return array[0] as Head<Arr>
}
