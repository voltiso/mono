// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Collection } from '../Localstore.js'

export function updateCollectionSubject(collection: Collection): void {
	const docs = Object.fromEntries(
		Object.entries(collection._docs)
			.filter(([_id, doc]) => Boolean(doc.data$.value))
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			.map(([id, doc]) => [id, doc.data$.value!]),
	)

	collection._docs$.next(docs)
}
