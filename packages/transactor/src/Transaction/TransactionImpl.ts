// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as Database from '@voltiso/firestore-like'
import type { CALL } from '@voltiso/util'
import { lazyConstructor, omit, staticImplements } from '@voltiso/util'

import { Db } from '~/Db/Db'
import type { DocPath } from '~/Path'

import type { Cache } from './Cache'
import type { ParentContext, TransactionContext } from './Context'
import type { TransactionConstructor } from './TransactionConstructor'

@staticImplements<TransactionConstructor<TransactionImpl_>>()
class TransactionImpl_ extends lazyConstructor(() => Db) {
	declare _context: TransactionContext
	_databaseTransaction: Database.Transaction

	_cache: Cache = new Map()
	_numFloatingPromises = 0
	_numMethodsNested = 0
	_numTriggersNested = 0
	_isFinalizing = false
	_error: Error | null = null
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

export type TransactionImpl = TransactionImpl_ & Db[CALL]

export const TransactionImpl =
	TransactionImpl_ as TransactionConstructor<TransactionImpl_>
