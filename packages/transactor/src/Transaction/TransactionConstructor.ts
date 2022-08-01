// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as FirestoreLike from '@voltiso/firestore-like'

import type { ParentContext } from './Context.js'
import type { Transaction } from './Transaction.js'
import type { TransactionImpl } from './TransactionImpl.js'

export interface TransactionConstructor<
	Derived extends Transaction = TransactionImpl,
> {
	new (
		parentContext: ParentContext,
		databaseTransaction: FirestoreLike.Transaction,
	): Derived
}
