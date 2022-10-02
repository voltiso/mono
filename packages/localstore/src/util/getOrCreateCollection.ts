// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CollectionPath, Localstore } from '..'
import { Collection } from '..'

export function getOrCreateCollection(
	store: Localstore,
	path: CollectionPath,
): Collection {
	// eslint-disable-next-line security/detect-object-injection
	return (store._collections[path] ||= new Collection())
}
