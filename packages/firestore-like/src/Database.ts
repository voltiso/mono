// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CollectionReference } from './CollectionReference'
import type { DocumentReference } from './DocumentReference'
import type { Transaction } from './Transaction'
import type { TransactionOptions } from './TransactionOptions'

export interface Database {
	doc: (path: string) => DocumentReference
	collection: (path: string) => CollectionReference
	runTransaction: <R>(
		body: (transaction: Transaction) => Promise<R>,
		options?: TransactionOptions,
	) => Promise<R>
}

export const isDatabase = (x: unknown): x is Database =>
	Boolean((x as Database).runTransaction) &&
	Boolean((x as Database).doc) &&
	Boolean((x as Database).collection)
