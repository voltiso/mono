// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	Brands,
	GetNested,
	Nest_,
	NoArgument,
	PropertyPathString,
	Split,
} from '~'

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
 * declare module '@voltiso/util' {
 * 	interface Brands {
 * 		transactor: {
 * 			doc: { [k in DocTag]?: true }
 * 		}
 * 	}
 * }
 *
 * export type DocBrand<Tag extends DocTag> = DocTag extends Tag
 * 	? { [BRAND]?: unknown }
 * 	: CustomBranded<'transactor.doc', { [k in Tag]: true }>
 * ```
 *
 * 🌿 **Type-only** (no value at runtime)
 */
export interface CustomBrand<
	path extends BrandPath,
	detail extends Brand.GetConstraint<path>,
> {
	/** 🌿 Type-only (no value at runtime) */
	// eslint-disable-next-line etc/no-internal
	readonly [BRAND]: _CustomBrandEntry<path, detail>
}

/** @internal */
export type _CustomBrandEntry<
	path extends BrandPath,
	detail extends Brand.GetConstraint<path>,
> = Nest_<detail, Split<path, { separator: '.' }>>

/**
 * Helper for implementing **nominal type hierarchies**.
 *
 * @example
 *
 * ```ts
 * type Name = string & Brand<'name'>
 * type DogName = string & Brand<'name.dog'>
 * ```
 *
 * 🌿 **Type-only** (no value at runtime)
 */
export interface Brand<path extends BrandPath>
	extends CustomBrand<path, Brand.GetConstraint<path>> {}

// export interface Branded<path extends BrandPath>
// 	extends CustomBranded<path, Brand.GetConstraint<path>> {}

export type GetBrand<
	path extends BrandPath,
	detail extends Brand.GetConstraint<path> | NoArgument = NoArgument,
> = detail extends NoArgument
	? Brand<path>
	: detail extends Brand.GetConstraint<path>
	? CustomBrand<path, detail>
	: never

export type BrandPath = Exclude<PropertyPathString.ForObject<Brands>, ''>

export namespace Brand {
	export type GetConstraint<path extends BrandPath> = GetNested<
		Brands,
		Split<path, { separator: '.' }>
	>
}
