// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable es-x/no-class-instance-fields */

import type * as Database from '@voltiso/firestore-like'

export class DocumentSnapshot implements Database.DocumentSnapshot {
	_data: Database.DocumentData | undefined

	constructor(data: Database.DocumentData | undefined) {
		this._data = data
		// this._data = deepCloneData(data)
	}

	data(): Database.DocumentData | undefined {
		return this._data
	}
}
