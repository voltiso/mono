// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as FirestoreLike from '@voltiso/firestore-like'

export function isTimestamp(x: unknown): x is FirestoreLike.Timestamp {
	const d = x as Partial<FirestoreLike.Timestamp> | undefined

	if (!d) return false

	return Boolean(d.toDate)
}
