// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Brands } from '~/Brands-augmentation'
import type { PropertyPath, PropertyPathString } from '~/object'
import type { Split } from '~/string'

export type BrandFirstSegment = keyof Brands
export type BrandPath = Exclude<PropertyPath.ForObject<Brands>, readonly []>
export type BrandPathString = Exclude<PropertyPathString.ForObject<Brands>, ''>

export type BrandReference = BrandFirstSegment | BrandPath | BrandPathString

export namespace BrandReference {
	export type ToPath<B extends BrandReference> = ToPath_<B>

	export type ToPath_<B> = B extends BrandFirstSegment
		? [B]
		: B extends readonly unknown[]
			? B
			: B extends string
				? Split<B, { separator: '.' }>
				: never
}
