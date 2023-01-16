// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Brands } from '~/Brands-augmentation'
import type { GetNested_, Nest_ } from '~/object'

import type { NoArgument } from '../optional-argument'
import type { BrandReference } from './BrandReference'

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
	B extends BrandReference,
	detail extends Brand.GetConstraint<B> = Brand.GetConstraint<B>,
> extends CustomBrand_<B, detail> {}

export interface CustomBrand_<B, detail> {
	/** 🌿 Type-only (no value at runtime) */
	// eslint-disable-next-line etc/no-internal
	readonly [BRAND]: _CustomBrandEntry<B, detail>
}

/** @internal */
export type _CustomBrandEntry<B, detail> = Nest_<
	detail,
	BrandReference.ToPath_<B>
>

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
export interface Brand<B extends BrandReference>
	extends CustomBrand<B, Brand.GetConstraint<B>> {}

// export interface Branded<path extends BrandPath>
// 	extends CustomBranded<path, Brand.GetConstraint<path>> {}

export type GetBrand<
	B extends BrandReference,
	detail extends Brand.GetConstraint<B> | NoArgument = NoArgument,
> = GetBrand_<B, detail>

export type GetBrand_<B, detail = NoArgument> = B extends BrandReference
	? detail extends NoArgument
		? Brand<B>
		: detail extends Brand.GetConstraint<B>
		? CustomBrand<B, detail>
		: never
	: never

//

export namespace Brand {
	export type GetConstraint<B extends BrandReference> = GetConstraint_<B>

	export type GetConstraint_<B> = GetNested_<Brands, BrandReference.ToPath_<B>>
}
