// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type * as Database from '@voltiso/firestore-like'
import { at } from '@voltiso/util'
import { deepCloneData } from '@voltiso/util.firestore'

import { ArrayRemove, ArrayUnion, DeleteIt, IncrementIt } from '~/FieldValue.js'

export function applyUpdatesInPlace(
	data: Database.DocumentData,
	updates: Database.UpdateData,
) {
	for (const [path, v] of Object.entries(updates)) {
		const pathTokens = path.split('.')
		let o = data as any

		for (const token of pathTokens.slice(0, -1)) {
			if (o[token] === undefined) o[token] = {}

			o = o[token]
		}

		const f = at(pathTokens, -1)

		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		if (v instanceof DeleteIt) delete o[f]
		else if (v instanceof IncrementIt) {
			o[f] ||= 0

			o[f] += v._n
		} else if (v instanceof ArrayUnion) {
			o[f] = [...new Set([...(o[f] || []), ...v._items])]
		} else if (v instanceof ArrayRemove) {
			const result = new Set((o[f] || []) as never)
			for (const item of v._items) result.delete(item)

			o[f] = result
		} else {
			o[f] = deepCloneData(v)
		}
	}
}
