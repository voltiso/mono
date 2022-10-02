// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import { deepCloneData } from '@voltiso/util.firestore'

import type { WithDb } from '~/Db'
import { DocImpl } from '~/Doc'
import type { WithDocRef } from '~/Ref'
import type { PartialIntrinsicFields } from '~/schemas'
import { sVoltisoEntry } from '~/schemas'
import type { CacheEntry, WithTransaction } from '~/Transaction'
import type { WithTransactor } from '~/Transactor'
import { initLastDataSeen } from '~/Trigger'

export function setCacheEntry(
	ctx: WithTransaction & WithDocRef & WithDb & WithTransactor,
	entry: CacheEntry,
	data: PartialIntrinsicFields | null,
	hadUpdates = true,
) {
	if (ctx.transactor._options.partial && !data && hadUpdates) {
		// console.log('cannot possibly exist', ctx.docRef.path.toString())
		if (ctx.docRef.path.toString().endsWith('2')) throw new Error('asdf')
		entry.possiblyExists = false
	}

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

	if (entry.originalData === undefined)
		entry.originalData = deepCloneData(entry.data)
	initLastDataSeen(ctx, entry)
}
