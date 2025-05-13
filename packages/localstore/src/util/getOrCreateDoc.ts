// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
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
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, sonarjs/no-nested-assignment
	return (collection._docs[id] ||= new Doc(null))
}
