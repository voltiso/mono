// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as FirestoreLike from '@voltiso/firestore-like'

import type { ParentContext } from './Context'
import type { Transaction } from './Transaction'

export interface TransactionConstructor<
	Derived extends Transaction = Transaction,
> {
	// eslint-disable-next-line @typescript-eslint/prefer-function-type
	new (
		parentContext: ParentContext,
		databaseTransaction: FirestoreLike.Transaction,
	): Derived
}
