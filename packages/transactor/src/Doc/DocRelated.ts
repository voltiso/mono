// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocTag } from '~/DocTypes'
import type { DocTypes } from '~/DocTypes-module-augmentation'

import type { DocConstructor, DocConstructorLike } from './DocConstructor'
import type { DocTILike, DTI } from './DocTI'
import type { DocLike } from './IDoc'

export type WithDocTI = {
	readonly [DTI]: any
}

export type DocRelatedLike = WithDocTI | DocTILike | DocTag

export type GetDocTI<X extends DocRelatedLike> = X extends WithDocTI
	? X[DTI]
	: X extends DocTILike
	? X
	: X extends DocTag
	? DocTypes[X][DTI]
	: never

export type GetDocTag<X extends DocRelatedLike> = X extends WithDocTI
	? X[DTI]['tag']
	: X extends DocTILike
	? X['tag']
	: X extends DocTag
	? X
	: never

export type GetDoc<X extends DocRelatedLike> = X extends DocLike
	? X
	: X extends WithDocTI
	? DocTypes[X[DTI]['tag']]
	: X extends DocTILike
	? DocTypes[X['tag']]
	: X extends DocTag
	? DocTypes[X]
	: never

export type GetDocConstructor<X extends DocRelatedLike> =
	X extends DocConstructorLike
		? X
		: X extends WithDocTI
		? DocConstructor<X[DTI]>
		: X extends DocTILike
		? DocConstructor<X>
		: X extends DocTag
		? DocConstructor<DocTypes[X][DTI]>
		: never
