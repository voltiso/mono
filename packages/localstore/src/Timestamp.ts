// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as Database from '@voltiso/firestore-like'
import { staticImplements } from '@voltiso/util'

@staticImplements<Database.TypeofTimestamp>()
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore experimental decorators
export class Timestamp implements Database.Timestamp {
	_date: Date
	constructor(date: Date) {
		this._date = date
	}

	toDate() {
		return this._date
	}

	static fromDate(date: Date) {
		return new Timestamp(date)
	}
}
