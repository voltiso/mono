// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Localstore } from '~/Localstore.js'
import { Collection } from '~/Localstore.js'

import type { CollectionPath } from '../index.js'

export function getOrCreateCollection(
	store: Localstore,
	path: CollectionPath,
): Collection {
	// biome-ignore lint/suspicious/noAssignInExpressions: .
	return (store._collections[path] ||= new Collection())
}
