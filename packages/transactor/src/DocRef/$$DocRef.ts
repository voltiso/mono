// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocBrand } from '~/brand'
import type { AnyDoc, DocTagLike } from '~/DocTypes'

export const IS_DOC_REF = Symbol('IS_DOC_REF')
export type IS_DOC_REF = typeof IS_DOC_REF

export interface $$DocRef {
	readonly [IS_DOC_REF]: true
}

/** Minimal version used by `RelaxRefs` */
export interface DocRefLike<tag extends DocTagLike | AnyDoc = AnyDoc>
	extends $$DocRef,
		DocBrand<tag> {
	//
	isStrong: boolean
}

/** Minimal version used by `RelaxRefs` */
export interface StrongDocRefLike<tag extends DocTagLike | AnyDoc = AnyDoc>
	extends DocRefLike<tag> {
	isStrong: true
}

/** Minimal version used by `RelaxRefs` */
export interface WeakDocRefLike<tag extends DocTagLike | AnyDoc = AnyDoc>
	extends DocRefLike<tag> {
	isStrong: false
}
