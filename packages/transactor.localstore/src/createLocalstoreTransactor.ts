// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as FirestoreLike from '@voltiso/firestore-like'
import { isDatabase } from '@voltiso/firestore-like'
import { FieldValue, Timestamp } from '@voltiso/localstore'
import type { TransactorOptions } from '@voltiso/transactor'
import { Transactor } from '@voltiso/transactor'

const firestoreModule = {
	FieldValue,
	Timestamp,
}

type Args =
	| []
	| [Partial<TransactorOptions>]
	| [FirestoreLike.Database]
	| [FirestoreLike.Database, Partial<TransactorOptions>]

//

export function createLocalstoreTransactor(): Transactor

export function createLocalstoreTransactor(
	options: Partial<TransactorOptions>,
): Transactor

export function createLocalstoreTransactor(
	database: FirestoreLike.Database,
): Transactor

export function createLocalstoreTransactor(
	database: FirestoreLike.Database,
	options: Partial<TransactorOptions>,
): Transactor

export function createLocalstoreTransactor(...args: Args) {
	if (isDatabase(args[0])) {
		const [db, ...rest] = args
		return new Transactor(db, firestoreModule, ...rest)
	} else return new Transactor(...(args as [] | [Partial<TransactorOptions>]))
}
