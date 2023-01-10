// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Brand, CustomBrand } from '~/type/brand'

declare module '~/Brands-augmentation' {
	interface Brands {
		symbol: Record<string, {}>
	}
}

//

export type SymbolBrand<S extends string = string> = string extends S
	? CustomBrand<'symbol', {}>
	: Brand<['symbol', S]>

/**
 * It's a real `Symbol` at runtime.
 *
 * - Replaces TypeScript's `unique symbol` type with a `symbol` type + nominal
 *   type branding
 * - Safe to type-inline using `@voltiso/transform/inline`, as it has no unique
 *   symbol dependencies
 * - It's not as type safe as `unique symbol` - be careful to pick unique names
 */
export type BrandedSymbol<S extends string> = symbol & SymbolBrand<S>

/**
 * It's a real `Symbol` at runtime.
 *
 * - Replaces TypeScript's `unique symbol` type with a `symbol` type + nominal
 *   type branding
 * - Safe to type-inline using `@voltiso/transform/inline`, as it has no unique
 *   symbol dependencies
 * - It's not as type safe as `unique symbol` - be careful to pick unique names
 */
export function BrandedSymbol<S extends string>(str: S): BrandedSymbol<S> {
	return Symbol(str) as never
}
