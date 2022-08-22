// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'

import type { PartialIntrinsicFields } from '~'
import { sVoltisoEntry } from '~'
import type { WithDb } from '~/Db'
import { DocImpl } from '~/Doc'
import type { WithDocRef } from '~/Ref'
import type { CacheEntry, WithTransaction } from '~/Transaction'
import type { WithTransactor } from '~/Transactor'

export function setCacheEntry(
	ctx: WithTransaction & WithDocRef & WithDb & WithTransactor,
	entry: CacheEntry,
	data: PartialIntrinsicFields | null,
) {
	if (entry.data) $assert(entry.__voltiso === entry.data.__voltiso)

	if (data !== entry.data) {
		if (!data) entry.proxy = null
		else if (entry.proxy) entry.proxy._setRaw(data)
		else {
			entry.proxy = new DocImpl(ctx, data)
		}
	}

	$assert(entry.proxy !== undefined)

	entry.data = entry.proxy ? entry.proxy._raw : entry.proxy

	entry.__voltiso = sVoltisoEntry.validate(data?.__voltiso || entry.__voltiso)

	if (entry.data) entry.data.__voltiso = entry.__voltiso

	if (entry.data) $assert(entry.__voltiso === entry.data.__voltiso)
}
