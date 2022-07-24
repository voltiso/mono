// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as Database from '@voltiso/firestore-like'
import { isDefined } from '@voltiso/util'

import type { Transaction } from './Transaction.js'

export class Lock {
	transaction: Transaction

	/**
	 * - `null`: does not exist
	 * - `undefined`: not cached (no writes yet)
	 */
	data?: Database.DocumentData | null

	constructor(transaction: Transaction, data?: Database.DocumentData | null) {
		this.transaction = transaction

		if (isDefined(data)) this.data = data
	}
}
