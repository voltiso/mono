// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Assume } from '@voltiso/util'

import type { AnyDoc, DocTag, DocTagLike } from '~/DocTypes'
import type { DocTypes } from '~/DocTypes-module-augmentation'

import type { $$DocTI, DocTI, DTI } from '../Doc/DocTI'
import type { $$Doc } from '../Doc/IDoc'
import type { $$DocRelatedLike, WithDocTI } from './DocRelated'

export type GetDocTI<X extends $$DocRelatedLike> = $$Doc extends X
	? DocTI
	: Assume<
			DocTI,
			X extends WithDocTI
				? X[DTI]
				: X extends $$DocTI
				? X
				: X extends DocTagLike | AnyDoc
				? GetDocTI.ByTag<X>
				: never
	  >

export namespace GetDocTI {
	/** ⚠️ Problematic with recursive types */
	export type ByTag<tag extends DocTagLike | AnyDoc> = tag extends AnyDoc
		? DocTI
		: tag extends DocTag
		? DocTypes[tag] extends { [DTI]: unknown }
			? Assume<DocTI, DocTypes[tag][DTI]> // ! problematic with recursive types
			: never
		: never
}
