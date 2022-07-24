// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as Database from '@voltiso/firestore-like'
import { isObject, undef } from '@voltiso/util'

export function isDocumentReference(
	x: unknown,
): x is Database.DocumentReference {
	if (!isObject(x)) return false

	const d = x as Partial<Database.DocumentReference> | undefined

	if (!d) return false

	return Boolean(
		d.delete && d.get && d.id !== undef && d.path && d.set && d.update,
	)
}
