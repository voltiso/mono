// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type * as Database from '@voltiso/firestore-like'
import { at } from '@voltiso/util'
import { deepCloneData } from '@voltiso/util.firestore'

import { ArrayRemove, ArrayUnion, DeleteIt, IncrementIt } from '~/FieldValue'

export function applyUpdatesInPlace(
	data: Database.DocumentData,
	updates: Database.UpdateData,
) {
	for (const [path, v] of Object.entries(updates)) {
		const pathTokens = path.split('.')
		let o = data as any

		for (const token of pathTokens.slice(0, -1)) {
			// eslint-disable-next-line security/detect-object-injection
			if (o[token] === undefined) o[token] = {}

			// eslint-disable-next-line security/detect-object-injection
			o = o[token]
		}

		const f = at(pathTokens, -1)

		// eslint-disable-next-line security/detect-object-injection
		if (v instanceof DeleteIt) delete o[f]
		else if (v instanceof IncrementIt) {
			// eslint-disable-next-line security/detect-object-injection
			o[f] ||= 0
			// eslint-disable-next-line security/detect-object-injection
			o[f] += v._n
		} else if (v instanceof ArrayUnion) {
			// eslint-disable-next-line security/detect-object-injection
			o[f] = [...new Set([...(o[f] || []), ...v._items])]
		} else if (v instanceof ArrayRemove) {
			// eslint-disable-next-line security/detect-object-injection
			const result = new Set((o[f] || []) as never)
			for (const item of v._items) result.delete(item)
			// eslint-disable-next-line security/detect-object-injection
			o[f] = result
		} else {
			// eslint-disable-next-line security/detect-object-injection
			o[f] = deepCloneData(v)
		}
	}
}
