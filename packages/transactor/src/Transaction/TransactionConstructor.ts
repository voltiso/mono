// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as FirestoreLike from '@voltiso/firestore-like'

import type { ParentContext } from './Context'
import type { Transaction } from './Transaction'

export interface TransactionConstructor<
	Derived extends Transaction = Transaction,
> {
	new (
		parentContext: ParentContext,
		databaseTransaction: FirestoreLike.Transaction,
	): Derived
}
