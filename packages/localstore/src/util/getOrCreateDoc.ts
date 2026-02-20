// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Localstore } from '~/Localstore.js'
import { Doc } from '~/Localstore.js'
import type { CollectionPath } from '~/Path.js'

import { getOrCreateCollection } from './getOrCreateCollection.js'

export function getOrCreateDoc(
	store: Localstore,
	collectionPath: CollectionPath,
	id: string,
): Doc {
	const collection = getOrCreateCollection(store, collectionPath)

	// biome-ignore lint/suspicious/noAssignInExpressions: .
	return (collection._docs[id] ||= new Doc(null))
}
