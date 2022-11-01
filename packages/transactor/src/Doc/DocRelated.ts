// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Assume, Get_, IsUnion, NewableReturn_ } from '@voltiso/util'

import type { $$DocRef } from '~/DocRef'
import type { AnyDocTag, DocTag, DocTagLike } from '~/DocTypes'
import type { DocTypes } from '~/DocTypes-module-augmentation'

import type { Doc } from './Doc'
import type {
	$$DocConstructor,
	DocConstructor,
	IDocConstructor,
} from './DocConstructor'
import type { $$DocTI, DocTI, DTI } from './DocTI'
import type { $$Doc } from './IDoc'
import type { IndexedDoc, IndexedDocTI } from './IndexedDoc'

export type WithDocTI = {
	readonly [DTI]: DocTI
}

// export type WithDocRelated<R extends $$DocRelated = $$DocRelated> = {
// 	readonly [DOC_RELATED]: R
// }

export type $$DocRelated =
	| $$DocConstructor
	| $$Doc
	| $$DocRef
	| $$DocTI
	| WithDocTI
	| DocTagLike
	| AnyDocTag

export type GetDocTI<X extends $$DocRelated> = $$Doc extends X
	? DocTI
	: Assume<
			DocTI,
			// X extends WithDocRelated
			// 	? GetDocTI<X[DOC_RELATED]>
			// 	:
			X extends WithDocTI
				? X[DTI]
				: X extends $$DocTI
				? X
				: X extends DocTagLike
				? Get_<DocTypes[X], DTI>
				: never
	  >

//

// type A = GetDocTag<IndexedDoc>
// type B = GetDocTag<Doc>
// type C = GetDocTag<$$Doc>

export type GetDocTag<X extends $$DocRelated> = GetDocTag.FromDocRelated<X>

export namespace GetDocTag {
	export type FromDocRelated<X extends $$DocRelated> = Assume<
		DocTag,
		// eslint-disable-next-line etc/no-internal
		_Finalize<_GetDocTag<X>>
	>

	/** @internal */
	export type _Finalize<tag> = IsUnion<tag> extends true ? never : tag

	/** @internal Use {@link GetDocTag} instead */
	export type _GetDocTag<X extends $$DocRelated> = X extends WithDocTI
		? X[DTI]['tag']
		: X extends DocTI
		? X['tag']
		: X extends DocTag
		? X
		: never
}

export type GetDoc<X extends $$DocRelated> = Assume<
	$$Doc,
	X extends $$DocConstructor
		? NewableReturn_<X>
		: X extends $$Doc
		? X
		: X extends WithDocTI
		? DocTypes[X[DTI]['tag']]
		: X extends DocTI
		? IndexedDocTI extends X
			? IndexedDoc
			: DocTypes[X['tag']]
		: X extends DocTagLike
		? DocTypes[X]
		: X extends AnyDocTag
		? Doc
		: never
>

export type GetDocConstructor<X extends $$DocRelated> = Assume<
	IDocConstructor,
	// X extends WithDocRelated
	// 	? GetDocConstructor<X[DOC_RELATED]>
	// 	:
	X extends $$DocConstructor
		? X
		: X extends WithDocTI
		? DocConstructor<X[DTI]>
		: X extends DocTI
		? DocConstructor<X>
		: X extends keyof DocTypes
		? DocConstructor<Assume<DocTI, Get_<DocTypes[X], DTI>>>
		: never
>
