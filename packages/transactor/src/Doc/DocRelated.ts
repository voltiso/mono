// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Assume, Get_, NewableReturn_ } from '@voltiso/util'

import type { DocTag, DocTagLike } from '~/DocTypes'
import type { DocTypes } from '~/DocTypes-module-augmentation'

import type { Doc } from './Doc'
import type {
	$$DocConstructor,
	DocConstructor,
	IDocConstructor,
} from './DocConstructor'
import type { $$DocTI, DOC, DocTI, DTI } from './DocTI'
import type { $$Doc } from './IDoc'

export type WithDocTI = {
	readonly [DTI]: DocTI
}

export type WithDoc = {
	readonly [DOC]: Doc
}

export type $$DocRelated =
	| $$DocConstructor
	| $$Doc
	| $$DocTI
	| WithDocTI
	| DocTagLike

export type GetDocTI<X extends $$DocRelated> = $$Doc extends X
	? DocTI
	: Assume<
			DocTI,
			X extends WithDocTI
				? X[DTI]
				: X extends $$DocTI
				? X
				: X extends DocTagLike
				? Get_<DocTypes[X], DTI>
				: never
	  >

//

export type GetDocTag<X extends $$DocRelated> = $$Doc extends X
	? DocTag
	: Assume<
			DocTag,
			X extends WithDocTI
				? X[DTI]['tag']
				: X extends DocTI
				? X['tag']
				: X extends DocTagLike
				? X
				: never
	  >

export type GetDoc<X extends $$DocRelated> = Assume<
	$$Doc,
	X extends $$DocConstructor
		? NewableReturn_<X>
		: X extends $$Doc
		? X
		: X extends WithDocTI
		? DocTypes[X[DTI]['tag']]
		: X extends $$DocTI
		? Get_<DocTypes, Get_<X, 'tag'>>
		: X extends DocTagLike
		? DocTypes[X]
		: never
>

export type GetDocConstructor<X extends $$DocRelated> = Assume<
	IDocConstructor,
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
