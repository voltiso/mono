// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocBrand } from '~/brand'
import type { $$DocRelated, GetDocTag } from '~/DocRelated'
import type { AnyDoc } from '~/DocTypes'

export type IS_DOC_REF = { readonly symbol: unique symbol }['symbol']
export const IS_DOC_REF: IS_DOC_REF = Symbol('IS_DOC_REF') as never

export interface $$DocRef {
	readonly [IS_DOC_REF]: true
}

/**
 * Minimal version used by `RelaxRefs`
 *
 * This actually is "either weak or strong" (weak is supertype)
 */
export interface WeakDocRefLike<R extends $$DocRelated | AnyDoc = AnyDoc>
	extends $$DocRef,
		DocBrand<GetDocTag<R>> {
	//
	isStrong: boolean // ! supertype
}

/**
 * Minimal strong document reference version used by `RelaxRefs`
 *
 * ⚠️ {@link WeakDocRefLike} is supertype
 */
export interface DocRefLike<tag extends $$DocRelated = AnyDoc>
	extends WeakDocRefLike<tag> {
	isStrong: true
}
