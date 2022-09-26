// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { createLocalstore, FieldValue } from '@voltiso/localstore'
import type { FirestoreLikeModule, Options } from '@voltiso/transactor'
import { createTransactor as origCreateTransactor } from '@voltiso/transactor'

export const database = createLocalstore()
export const staticContext: FirestoreLikeModule = {
	FieldValue,
	// Timestamp,
}

export function createTransactor(opts?: Options) {
	if (opts) return origCreateTransactor(database, staticContext, opts)
	else return origCreateTransactor(database, staticContext)
}
