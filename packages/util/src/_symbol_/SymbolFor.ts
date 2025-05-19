// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type SymbolFor<T extends string> = { readonly _: unique symbol }['_'] & {
	for: T
}

export function symbolFor<T extends string>(name: T): SymbolFor<T> {
	return Symbol.for(name) as SymbolFor<T>
}
