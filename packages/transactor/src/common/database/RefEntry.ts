// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as Database from '@voltiso/firestore-like'
import { isObject } from '@voltiso/util'

import { isDocumentReference } from './isDocumentReference.js'

export type RefEntry = {
	__target: Database.DocumentReference
	__isStrong: boolean
}

export function isRefEntry(x: unknown): x is RefEntry {
	if (!isObject(x)) return false

	if (Object.keys(x).length !== 2) return false

	if (!('__target' in x)) return false

	if (typeof (x as RefEntry).__target !== 'object') return false

	if (typeof (x as RefEntry).__isStrong !== 'boolean') return false

	if (!isDocumentReference((x as RefEntry).__target)) return false

	return true
}
