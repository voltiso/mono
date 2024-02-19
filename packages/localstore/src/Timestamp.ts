// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import type * as Database from '@voltiso/firestore-like'
import { staticImplements } from '@voltiso/util'

@staticImplements<Database.TypeofTimestamp>()
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
