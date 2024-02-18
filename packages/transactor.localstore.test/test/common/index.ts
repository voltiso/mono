// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { createLocalstore, FieldValue } from '@voltiso/localstore'
import type {
	FirestoreLikeModule,
	TransactorOptions,
} from '@voltiso/transactor'
import { Transactor } from '@voltiso/transactor'

export const database = createLocalstore()
export const staticContext: FirestoreLikeModule = {
	FieldValue,
	// Timestamp,
}

export function createTransactor(opts?: Partial<TransactorOptions>) {
	if (opts) return new Transactor(database, staticContext, opts)
	else return new Transactor(database, staticContext)
}
