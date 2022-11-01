// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Assume, IsUnion } from '@voltiso/util'

import type { AnyDoc, DocTag } from '~/DocTypes'

import type { DocTI, DTI } from '../Doc/DocTI'
import type { $$DocRelatedLike, WithDocTI } from './DocRelated'

// type A = GetDocTag<IndexedDoc>
// type B = GetDocTag<Doc>
// type C = GetDocTag<$$Doc>

export type GetDocTag<X extends $$DocRelatedLike> = GetDocTag.ByDocRelated<X>

export namespace GetDocTag {
	export type ByString<str extends string | AnyDoc> = str extends
		| DocTag
		| AnyDoc
		? str
		: never

	export type ByDocRelated<X extends $$DocRelatedLike> = Assume<
		DocTag | AnyDoc,
		// eslint-disable-next-line etc/no-internal
		_Finalize<_GetDocTag<X>>
	>

	/** @internal */
	export type _Finalize<tag> = IsUnion<tag> extends true
		? AnyDoc
		: [tag] extends [never]
		? AnyDoc
		: tag

	/**
	 * Use {@link GetDocTag} instead
	 *
	 * @internal
	 */
	export type _GetDocTag<X extends $$DocRelatedLike> = X extends WithDocTI
		? X[DTI]['tag']
		: X extends DocTI
		? X['tag']
		: X extends DocTag | AnyDoc
		? X
		: never
}
