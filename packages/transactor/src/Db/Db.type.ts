// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CollectionRef } from '../CollectionRef'
import type { IndexedDoc } from '../Doc/IndexedDoc.js'
import type { DocRefPattern, WeakDocRef } from '../Ref'
import type { DbCallArgs, DbCallResult } from './Db_.js'

export interface Db {
	<Args extends DbCallArgs>(...args: Args): DbCallResult<Args>

	doc(...pathTokens: readonly string[]): WeakDocRef<IndexedDoc>

	collection(...pathTokens: readonly string[]): CollectionRef<IndexedDoc>

	docPattern(
		...pathTokens: readonly {
			toString: () => string
		}[]
	): DocRefPattern
}
