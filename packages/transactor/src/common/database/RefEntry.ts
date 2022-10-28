// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as Database from '@voltiso/firestore-like'
import type { DeepPartial } from '@voltiso/util'
import { $AssumeType } from '@voltiso/util'

export interface DocRefJson {
	__voltiso: {
		type: 'Ref'
	}
	path: string
	isStrong: boolean
}

export interface DocRefDatabase {
	__voltiso: {
		type: 'Ref'
	}
	ref: Database.DocumentReference
	isStrong: boolean
}

export interface StrongDocRefJson extends DocRefJson {
	isStrong: true
}

export interface WeakDocRefJson extends DocRefJson {
	isStrong: false
}

export function isDocRefJson(x: unknown): x is DocRefJson {
	$AssumeType<DeepPartial<DocRefJson> | null>(x)
	return x?.__voltiso?.type === 'Ref' && typeof x.path === 'string'
}

export function isDocRefDatabase(x: unknown): x is DocRefDatabase {
	$AssumeType<DeepPartial<DocRefDatabase> | null>(x)
	return x?.__voltiso?.type === 'Ref' && !!x.ref
}

export function isStrongDocRefJson(x: unknown): x is StrongDocRefJson {
	return isDocRefJson(x) && x.isStrong
}

export function isWeakDocRefJson(x: unknown): x is StrongDocRefJson {
	return isDocRefJson(x) && !x.isStrong
}
