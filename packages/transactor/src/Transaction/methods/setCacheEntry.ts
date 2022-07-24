// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import { undef } from '@voltiso/util'

import type { DataWithoutId } from '../../Data'
import type { WithDb } from '../../Db'
import { Doc_ } from '../../Doc'
import type { WithDocRef } from '../../Ref'
import type { WithTransactor } from '../../Transactor'
import type { CacheEntry } from '../Cache.js'
import type { WithTransaction } from '../WithTransaction.js'

export function setCacheEntry(
	this: WithTransaction & WithDocRef & WithDb & WithTransactor,
	entry: CacheEntry,
	data: DataWithoutId | null,
) {
	if (entry.data) assert(entry.__voltiso === entry.data.__voltiso)

	if (data !== entry.data) {
		if (!data) entry.proxy = null
		else if (entry.proxy) entry.proxy._setRaw(data)
		else {
			entry.proxy = new Doc_(this, data)
		}
	}

	assert(entry.proxy !== undef)

	entry.data = entry.proxy ? entry.proxy._raw : entry.proxy

	// assert(entry.data === entry.proxy?.data)

	entry.__voltiso = data?.__voltiso || entry.__voltiso || { numRefs: 0 }

	if (entry.data) entry.data.__voltiso = entry.__voltiso

	if (entry.data) assert(entry.__voltiso === entry.data.__voltiso)
}
