// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as Database from '@voltiso/firestore-like'
import { assumeType, isPlain } from '@voltiso/util'

import { isDocumentReference } from './isDocumentReference.js'

export type RefEntry = {
	__target: Database.DocumentReference
	__isStrong: boolean
}

export function isRefEntry(x: unknown): x is RefEntry {
	if (!isPlain(x)) return false

	if (Object.keys(x).length !== 2) return false

	assumeType<Partial<RefEntry>>(x)

	if (!isDocumentReference(x.__target)) return false

	if (typeof x.__isStrong !== 'boolean') return false

	return true
}
