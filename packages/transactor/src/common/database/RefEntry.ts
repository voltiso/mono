// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as Database from '@voltiso/firestore-like'
import { assumeType, isPlainObject } from '@voltiso/util'

export interface DocRefJson {
	__target: string // path
	__isStrong: boolean
}

export interface DocRefDatabase {
	__target: Database.DocumentReference
	__isStrong: boolean
}

export interface StrongDocRefJson extends DocRefJson {
	__isStrong: true
}

export interface WeakDocRefJson extends DocRefJson {
	__isStrong: false
}

export function isDocRefJson(x: unknown): x is DocRefJson {
	if (!isPlainObject(x)) return false

	if (Object.keys(x).length !== 2) return false

	assumeType<Partial<DocRefJson>>(x)

	if (typeof x.__target !== 'string') return false

	if (typeof x.__isStrong !== 'boolean') return false

	return true
}

export function isDocRefDatabase(x: unknown): x is DocRefDatabase {
	if (!isPlainObject(x)) return false

	if (Object.keys(x).length !== 2) return false

	assumeType<Partial<DocRefJson>>(x)

	if (!Database.isDocumentReference(x.__target)) return false

	if (typeof x.__isStrong !== 'boolean') return false

	return true
}

export function isStrongDocRefJson(x: unknown): x is StrongDocRefJson {
	if (!isDocRefJson(x)) return false
	return x.__isStrong
}

export function isWeakDocRefJson(x: unknown): x is StrongDocRefJson {
	if (!isDocRefJson(x)) return false
	return !x.__isStrong
}
