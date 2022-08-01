// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type * as Database from '@voltiso/firestore-like'
import { deepClone, undef } from '@voltiso/util'

import { DeleteIt, IncrementIt } from '../FieldValue'

export function applyUpdatesInPlace(
	data: Database.DocumentData,
	updates: Database.UpdateData,
) {
	for (const [path, v] of Object.entries(updates)) {
		const pathTokens = path.split('.')
		let o = data as any

		for (const token of pathTokens.slice(0, -1)) {
			// eslint-disable-next-line security/detect-object-injection
			if (o[token] === undef) o[token] = {}

			// eslint-disable-next-line security/detect-object-injection
			o = o[token]
		}

		const f = pathTokens.at(-1) as string

		// eslint-disable-next-line security/detect-object-injection
		if (v instanceof DeleteIt) delete o[f]
		else if (v instanceof IncrementIt) {
			// eslint-disable-next-line security/detect-object-injection
			o[f] = o[f] || 0
			// eslint-disable-next-line security/detect-object-injection
			o[f] += v._n
			// eslint-disable-next-line security/detect-object-injection
		} else {
			// console.log('applyUpdatesInPlace', data, updates, 'deepClone')
			o[f] = deepClone(v)
		}
	}
}
