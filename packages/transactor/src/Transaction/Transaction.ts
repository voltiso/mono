// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as Database from '@voltiso/firestore-like'
import { lazyConstructor, omit, staticImplements } from '@voltiso/util'

import type { CanonicalPath } from '~/Db/CanonicalPath'
import { Db } from '~/Db/Db'
import type { DbPathFromString, DocPath } from '~/Path'

import type { Cache } from './Cache'
import type { ParentContext, TransactionContext } from './Context'
import type { TransactionConstructor } from './TransactionConstructor'

export interface Transaction {
	<Tokens extends readonly string[]>(...pathTokens: Tokens): DbPathFromString<
		CanonicalPath<Tokens>
	>
}

@staticImplements<TransactionConstructor<Transaction>>()
export class Transaction extends lazyConstructor(() => Db) {
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
