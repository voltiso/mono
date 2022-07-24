// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as Database from '@voltiso/firestore-like'
import type { CALL } from '@voltiso/util'
import { lazyConstructor, omit, staticImplements } from '@voltiso/util'

import { Db } from '../Db/Db.js'
import type { DocPath } from '../Path'
import type { Cache } from './Cache.js'
import type { ParentContext, TransactionContext } from './Context.js'
import type { TransactionConstructor } from './TransactionConstructor.js'

@staticImplements<TransactionConstructor<Transaction>>()
class Transaction extends lazyConstructor(() => Db) {
	declare _context: TransactionContext
	_databaseTransaction: Database.Transaction

	_cache: Cache = {}
	_numFloatingPromises = 0
	_numMethodsNested = 0
	_numTriggersNested = 0
	_isFinalizing = false
	_execContext: DocPath | null = null

	constructor(
		parentContext: ParentContext,
		databaseTransaction: Database.Transaction,
	) {
		super(omit(parentContext, 'db'))
		this._context.transaction = this
		this._databaseTransaction = databaseTransaction
		Object.seal(this)
	}
}

export type Transaction_ = Transaction & Db[CALL]
export const Transaction_ = Transaction as TransactionConstructor<Transaction_>
