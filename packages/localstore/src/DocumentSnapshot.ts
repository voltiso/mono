// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as Database from '@voltiso/firestore-like'
import { deepClone } from '@voltiso/util'

export class DocumentSnapshot implements Database.DocumentSnapshot {
	_data: Database.DocumentData | undefined

	constructor(data: Database.DocumentData | undefined) {
		console.log('DocumentSnapshot.constructor', data, 'deepClone')
		this._data = deepClone(data)
	}

	data(): Database.DocumentData | undefined {
		return this._data
	}
}
