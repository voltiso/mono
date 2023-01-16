// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Assume, IsUnion } from '@voltiso/util'

import type { AnyDoc, DocTag } from '~/DocTypes'

import type { $$DocTI, DTI } from '../Doc/DocTI'
import type { $$DocRelatedLike, WithDocTI } from './DocRelated'

export type GetDocTag<X extends $$DocRelatedLike> = GetDocTag.FromDocRelated<X>

export namespace GetDocTag {
	export type FromString<str extends string | AnyDoc> = str extends
		| DocTag
		| AnyDoc
		? str
		: never

	export type FromDocRelated<X extends $$DocRelatedLike> = Assume<
		DocTag | AnyDoc,
		// eslint-disable-next-line etc/no-internal
		_Finalize<Simple<X>>
	>

	/** @internal */
	export type _Finalize<tag> = IsUnion<tag> extends true
		? AnyDoc
		: [tag] extends [never]
		? AnyDoc
		: tag

	export type Simple<X extends $$DocRelatedLike> = X extends WithDocTI
		? X[DTI]['tag']
		: X extends $$DocTI & { tag: unknown }
		? X['tag']
		: X
}

export type GetDocRepresentative<X extends $$DocRelatedLike> =
	X extends WithDocTI
		? AnyDoc extends X[DTI]['tag']
			? X
			: X[DTI]['tag']
		: X extends $$DocTI & { tag: unknown }
		? AnyDoc extends X['tag']
			? X
			: X['tag']
		: X
