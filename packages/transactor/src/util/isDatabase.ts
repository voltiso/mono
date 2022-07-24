// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as FirestoreLike from '@voltiso/firestore-like'

export function isDatabase(x: unknown): x is FirestoreLike.Database {
	const d = x as Partial<FirestoreLike.Database> | undefined

	if (!d) return false

	return Boolean(d.collection && d.doc && d.runTransaction)
}
