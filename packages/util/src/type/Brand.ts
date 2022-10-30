// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Brands, Nest_, NoArgument, PropertyPathString, Split } from '~'

/** 🌿 Type-only (no value at runtime) */
export declare const BRAND: unique symbol

/** 🌿 Type-only (no value at runtime) */
export type BRAND = typeof BRAND

/**
 * Helper for implementing **nominal type hierarchies**.
 *
 * @example
 *
 * ```ts
 * type Name = string & Brand<'name'>
 * type DogName = string & Brand<'name.dog'>
 *
 * // or, equivalent:
 * type Name = string & Brand<{ name: unknown }>
 * type DogName = string & Brand<{ name: { dog: unknown } }>
 * ```
 *
 * 🌿 **Type-only** (no value at runtime)
 */
export interface DetailedBrand<path extends BrandPath, detail> {
	/** 🌿 Type-only (no value at runtime) */
	readonly [BRAND]: Nest_<detail, Split<path, { separator: '.' }>>
}

export interface Brand<path extends BrandPath>
	extends DetailedBrand<path, unknown> {}

/**
 * Helper for implementing **nominal type hierarchies**.
 *
 * 🌿 **Type-only** (no value at runtime)
 *
 * @deprecated Prefer using `Brand` directly.
 */
export type Branded<X, path extends BrandPath, detail = NoArgument> = [
	detail,
] extends [NoArgument]
	? X & Brand<path>
	: X & DetailedBrand<path, detail>

export type BrandPath = Exclude<PropertyPathString.ForObject<Brands>, ''>
