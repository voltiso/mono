// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Assume } from '@voltiso/util'

import type { $$DocRef } from '~/DocRef'
import type { AnyDoc, DocTag, DocTagLike } from '~/DocTypes'
import type { DocTypes } from '~/DocTypes-module-augmentation'

import type { $$DocTI, DocTI, DTI } from '../Doc/DocTI'
import type { $$Doc } from '../Doc/IDoc'
import type {
	$$DocConstructor,
	DocConstructor,
	IDocConstructor,
} from '../DocConstructor'

export type WithDocTI = {
	readonly [DTI]: DocTI
}

/** Accepts any string as DocTag */
export type $$DocRelatedLike =
	| $$DocConstructor
	| $$Doc
	| $$DocRef
	| $$DocTI
	| WithDocTI
	| DocTagLike // string
	| AnyDoc

/** Strict DocTags */
export type $$DocRelated = Exclude<$$DocRelatedLike, string> | DocTag

//

export type GetDocConstructor<X extends $$DocRelatedLike> = Assume<
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
		? DocTypes[X] extends { [DTI]: DocTI }
			? DocConstructor<DocTypes[X][DTI]>
			: never
		: never
>
