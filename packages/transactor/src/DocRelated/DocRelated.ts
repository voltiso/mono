// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$DocRef } from '~/DocRef'
import type { ANY_DOC, DocTag, DocTagLike } from '~/DocTypes'

import type { $$DocTI, DocTI, DTI } from '../Doc/DocTI'
import type { $$Doc } from '../Doc/IDoc'
import type { $$DocConstructor } from '../DocConstructor'

export interface WithDocTI {
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
	| ANY_DOC

/** Strict DocTags */
export type $$DocRelated = Exclude<$$DocRelatedLike, string> | ANY_DOC | DocTag
