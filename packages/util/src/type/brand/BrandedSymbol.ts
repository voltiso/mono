// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomBrand } from '~/type/brand'

declare module '~/Brands-augmentation' {
	interface Brands {
		symbol: Record<string, {}>
	}
}

//

/** `SymbolBrand` */
export interface $$<S extends string = string>
	extends CustomBrand<'symbol', string extends S ? {} : { [k in S]: {} }> {}

/**
 * `BrandedSymbol`
 *
 * It's a real `Symbol` at runtime.
 *
 * - Replaces TypeScript's `unique symbol` type with a `symbol` type + nominal
 *   type branding
 * - Safe to type-inline using `@voltiso/transform/inline`, as it has no unique
 *   symbol dependencies
 * - It's not as type safe as `unique symbol` - be careful to pick unique names
 */
export type $<S extends string> = symbol & $$<S>

/**
 * It's a real `Symbol` at runtime.
 *
 * - Replaces TypeScript's `unique symbol` type with a `symbol` type + nominal
 *   type branding
 * - Safe to type-inline using `@voltiso/transform/inline`, as it has no unique
 *   symbol dependencies
 * - It's not as type safe as `unique symbol` - be careful to pick unique names
 */
export function BrandedSymbol<S extends string>(str: S): $<S> {
	return Symbol(str) as never
}
