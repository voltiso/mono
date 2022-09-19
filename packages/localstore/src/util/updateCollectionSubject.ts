// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocumentData } from '@voltiso/firestore-like'

import type { Collection } from '../Localstore'

export function updateCollectionSubject(collection: Collection): void {
	const docs = Object.fromEntries(
		Object.entries(collection._docs)
			.filter(([_id, doc]) => Boolean(doc.data$.value))
			.map(([id, doc]) => [id, doc.data$.value as DocumentData]),
	)

	collection._docs$.next(docs)
}
