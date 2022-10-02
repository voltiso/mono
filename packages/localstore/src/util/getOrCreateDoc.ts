// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Localstore } from '~/Localstore'
import { Doc } from '~/Localstore'
import type { CollectionPath } from '~/Path'

import { getOrCreateCollection } from '.'

export function getOrCreateDoc(
	store: Localstore,
	collectionPath: CollectionPath,
	id: string,
): Doc {
	const collection = getOrCreateCollection(store, collectionPath)
	// eslint-disable-next-line security/detect-object-injection
	return (collection._docs[id] ||= new Doc(null))
}
