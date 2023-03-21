// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Localstore } from '~/Localstore'
import { Doc } from '~/Localstore'
import type { CollectionPath } from '~/Path'

import { getOrCreateCollection } from './getOrCreateCollection'

export function getOrCreateDoc(
	store: Localstore,
	collectionPath: CollectionPath,
	id: string,
): Doc {
	const collection = getOrCreateCollection(store, collectionPath)
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	return (collection._docs[id] ||= new Doc(null))
}
