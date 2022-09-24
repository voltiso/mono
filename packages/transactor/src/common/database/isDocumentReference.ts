// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as Database from '@voltiso/firestore-like'
import { assumeType, isObject } from '@voltiso/util'

export function isDocumentReference(
	x: unknown,
): x is Database.DocumentReference {
	if (!isObject(x)) return false

	assumeType<Partial<Database.DocumentReference>>(x)

	return Boolean(
		x.id !== undefined && x.path && x.set && x.update && x.delete && x.get,
	)
}
