// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocBrand } from '~/brand'
import type { $$DocRelated, GetDocTag } from '~/DocRelated'
import type { ANY_DOC } from '~/DocTypes'

declare global {
	namespace Voltiso {
		namespace Transactor {
			const IS_DOC_REF: unique symbol
			type IS_DOC_REF = typeof IS_DOC_REF
			// type IS_DOC_REF = { readonly _: unique symbol }['_']
			// const IS_DOC_REF: IS_DOC_REF
		}
	}
}
if (
	typeof (globalThis as any).Voltiso !== 'object' ||
	(globalThis as any).Voltiso === null
) {
	;(globalThis as any).Voltiso = {}
}
;(globalThis as any).Voltiso.Transactor ??= /* @__PURE__ */ {}
;(globalThis as any).Voltiso.Transactor.IS_DOC_REF ??=
	/* @__PURE__ */ Symbol.for('@voltiso/transactor/IS_DOC_REF')
export type IS_DOC_REF = Voltiso.Transactor.IS_DOC_REF
export const IS_DOC_REF: IS_DOC_REF =
	/* @__PURE__ */ Voltiso.Transactor.IS_DOC_REF

export interface $$DocRef {
	readonly [IS_DOC_REF]: true
}

/**
 * Minimal version used by `RelaxRefs`
 *
 * This actually is "either weak or strong" (weak is supertype)
 */
export interface WeakDocRefLike<R extends $$DocRelated | ANY_DOC = ANY_DOC>
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
export interface DocRefLike<tag extends $$DocRelated = ANY_DOC>
	extends WeakDocRefLike<tag> {
	isStrong: true
}
