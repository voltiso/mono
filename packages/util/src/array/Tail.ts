// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type Tail<L extends readonly unknown[]> = L extends [unknown, ...infer T]
	? T
	: L extends readonly [unknown, ...infer T]
		? readonly [...T]
		: never

export function tail<Arr extends readonly unknown[]>(array: Arr): Tail<Arr> {
	return array.slice(1) as Tail<Arr>
}
