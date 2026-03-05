// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ServerDocumentReference } from './DocumentReference'
import type { Timestamp } from './Timestamp'

export type Primitive =
	| string
	| number
	| boolean
	| Timestamp
	| Date // should be converted to `Timestamp`
	| ServerDocumentReference
	| null

export type DocumentDataNestedNoArray =
	| Primitive
	| { [k in string]: DocumentDataNested }

export type DocumentDataNested =
	| DocumentDataNestedNoArray
	| DocumentDataNestedNoArray[]

export type DocumentData = Record<string, DocumentDataNested>

// export type DocumentData = object
