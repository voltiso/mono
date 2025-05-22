// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Assume, IsUnion } from '@voltiso/util'

import type { ANY_DOC, DocTag } from '~/DocTypes'

import type { $$DocTI, DTI } from '../Doc/DocTI'
import type { $$DocRelatedLike, WithDocTI } from './DocRelated'

export type GetDocTag<X extends $$DocRelatedLike> = GetDocTag.FromDocRelated<X>

export namespace GetDocTag {
	export type FromString<str extends string | ANY_DOC> = str extends
		| DocTag
		| ANY_DOC
		? str
		: never

	export type FromDocRelated<X extends $$DocRelatedLike> = Assume<
		DocTag | ANY_DOC,
		_Finalize<Simple<X>>
	>

	/** @internal */
	export type _Finalize<tag> =
		IsUnion<tag> extends true ? ANY_DOC : [tag] extends [never] ? ANY_DOC : tag

	export type Simple<X extends $$DocRelatedLike> = X extends WithDocTI
		? X[DTI]['tag']
		: X extends $$DocTI & { tag: unknown }
			? X['tag']
			: X
}

export type GetDocRepresentative<X extends $$DocRelatedLike> =
	X extends WithDocTI
		? ANY_DOC extends X[DTI]['tag']
			? X
			: X[DTI]['tag']
		: X extends $$DocTI & { tag: unknown }
			? ANY_DOC extends X['tag']
				? X
				: X['tag']
			: X
