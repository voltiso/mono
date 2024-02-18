// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CollectionReference } from './CollectionReference'
import type { ServerDocumentReference } from './DocumentReference'
import type { Transaction } from './Transaction'
import type { TransactionOptions } from './TransactionOptions'

export interface Database {
	doc: (path: string) => ServerDocumentReference
	collection: (path: string) => CollectionReference
	runTransaction: <R>(
		body: (transaction: Transaction) => Promise<R>,
		options?: TransactionOptions,
	) => Promise<R>
}

export function isDatabase(x: unknown): x is Database {
	return (
		Boolean((x as Database | null)?.runTransaction) &&
		Boolean((x as Database | null)?.doc) &&
		Boolean((x as Database | null)?.collection)
	)
}
