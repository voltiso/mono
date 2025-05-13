// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { InferTI } from '~/CollectionRef'
import type { AnyDoc, DocTagLike } from '~/DocTypes'
import type { DocTypes } from '~/DocTypes-module-augmentation'

import type { DocTI, DTI } from '../Doc/DocTI'
import type { $$Doc } from '../Doc/IDoc'
import type { $$DocRelatedLike, WithDocTI } from './DocRelated'

/**
 * ⚠️ Careful - if a Doc argument is supplied, it infers methods and triggers
 * from implementation decorators (slow)
 */
export type GetDocTI<X extends $$DocRelatedLike> = X extends $$Doc
	? InferTI<X> // ! slow !
	: X extends WithDocTI
		? X[DTI]
		: X extends DocTI
			? X
			: X extends DocTagLike | AnyDoc
				? GetDocTI.FromTag<X>
				: DocTI // fallback to supertype
// : IndexedDocTI // fallback to indexed doc // ! too slow

export namespace GetDocTI {
	/** ⚠️ Problematic with recursive types */
	export type FromTag<tag extends DocTagLike | AnyDoc> = tag extends AnyDoc
		? DocTI
		: tag extends keyof DocTypes
			? DocTypes[tag][DTI & keyof DocTypes[tag]]
			: never
	// : DocTypes extends { [k in tag]: { [DTI]: infer R } }
	// ? R
	// ? Assume<DocTI, Get_<DocTypes[tag], DTI>> // ! problematic with recursive types
	// never

	export type FromDoc<doc extends $$Doc> = doc extends { [DTI]: DocTI }
		? doc[DTI]
		: DocTI
}
