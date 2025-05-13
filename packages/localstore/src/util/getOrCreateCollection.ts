// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Localstore } from '~/Localstore.js'
import { Collection } from '~/Localstore.js'

import type { CollectionPath } from '../index.js'

export function getOrCreateCollection(
	store: Localstore,
	path: CollectionPath,
): Collection {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, sonarjs/no-nested-assignment
	return (store._collections[path] ||= new Collection())
}
