// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { UNSET } from '_/symbols/unset'

import type { Brands } from '~/Brands-augmentation'
import type { GetNested_, Nest_ } from '~/object'

import type { BrandReference } from './BrandReference'

declare global {
	namespace Voltiso {
		const BRAND: unique symbol
		type BRAND = typeof BRAND
		// type BRAND = { readonly _: unique symbol }['_']
		// const BRAND: BRAND
	}
}

if (
	typeof (globalThis as any).Voltiso !== 'object' ||
	(globalThis as any).Voltiso === null
) {
	;(globalThis as any).Voltiso = {}
}

;(Voltiso.BRAND as any) ??= /* @__PURE__ */ Symbol.for('@voltiso/util/BRAND')
/** 🌿 Type-only (no value at runtime) */
export type BRAND = Voltiso.BRAND
/** 🌿 Type-only (no value at runtime) */
export const BRAND: BRAND = /* @__PURE__ */ Voltiso.BRAND

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
export interface Brand<B extends BrandReference> extends CustomBrand<
	B,
	Brand.GetConstraint<B>
> {}

// export interface Branded<path extends BrandPath>
// 	extends CustomBranded<path, Brand.GetConstraint<path>> {}

export type GetBrand<
	B extends BrandReference,
	detail extends Brand.GetConstraint<B> | UNSET = UNSET,
> = GetBrand_<B, detail>

export type GetBrand_<B, detail = UNSET> = B extends BrandReference
	? detail extends UNSET
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
