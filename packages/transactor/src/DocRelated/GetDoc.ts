// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NewableReturn_ } from '@voltiso/util'

import type { AnyDoc, DocTag, DocTagLike } from '~/DocTypes'
import type { DocTypes } from '~/DocTypes-module-augmentation'

import type { Doc } from '../Doc/Doc'
import type { DocTI, DTI } from '../Doc/DocTI'
import type { $$Doc } from '../Doc/IDoc'
import type { IndexedDoc, IndexedDocTI } from '../Doc/IndexedDoc'
import type { $$DocConstructor } from '../DocConstructor'
import type { $$DocRelatedLike, WithDocTI } from './DocRelated'

export type GetDoc<X extends $$DocRelatedLike> = X extends AnyDoc
	? IndexedDoc
	: X extends $$DocConstructor
	? NewableReturn_<X> extends never
		? IndexedDoc
		: NewableReturn_<X>
	: X extends $$Doc
	? X
	: X extends WithDocTI
	? X[DTI]['tag'] extends AnyDoc
		? Doc
		: X[DTI]['tag'] extends DocTag
		? DocTypes[X[DTI]['tag']]
		: never
	: X extends DocTI
	? IndexedDocTI extends X
		? IndexedDoc
		: X['tag'] extends AnyDoc
		? Doc
		: X['tag'] extends DocTag
		? DocTypes[X['tag']]
		: never
	: X extends DocTagLike | AnyDoc
	? GetDoc$.ByTag<X>
	: never

// export type GetDoc<X extends $$DocRelatedLike> =
// 	'Final' extends keyof GetDoc$<X> ? GetDoc$<X>['Final'] : never

export namespace GetDoc$ {
	export type ByTag<tag extends DocTagLike | AnyDoc> = tag extends DocTag
		? DocTypes[tag]
		: tag extends AnyDoc
		? Doc
		: never
}
