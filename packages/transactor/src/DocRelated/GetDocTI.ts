// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Assume, Get_ } from '@voltiso/util'

import type { InferTI } from '~/CollectionRef'
import type { AnyDoc, DocTag, DocTagLike } from '~/DocTypes'
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
	? GetDocTI.ByTag<X>
	: DocTI // fallback to supertype
// : IndexedDocTI // fallback to indexed doc // ! too slow

export namespace GetDocTI {
	/** ⚠️ Problematic with recursive types */
	export type ByTag<tag extends DocTagLike | AnyDoc> = tag extends AnyDoc
		? DocTI
		: tag extends DocTag
		? Assume<DocTI, Get_<DocTypes[tag], DTI>> // ! problematic with recursive types
		: never

	export type ByDoc<doc extends $$Doc> = doc extends { [DTI]: DocTI }
		? doc[DTI]
		: DocTI
}
