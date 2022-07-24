// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as FirestoreLike from '@voltiso/firestore-like'
import { isDatabase } from '@voltiso/firestore-like'
import { FieldValue, Timestamp } from '@voltiso/localstore'
import type { Options } from '@voltiso/transactor'
import { Transactor } from '@voltiso/transactor'

const firestoreModule = {
	FieldValue,
	Timestamp,
}

type Args =
	| []
	| [Options]
	| [FirestoreLike.Database]
	| [FirestoreLike.Database, Options]

export function createLocalstoreTransactor(): Transactor
export function createLocalstoreTransactor(options: Options): Transactor
export function createLocalstoreTransactor(
	database: FirestoreLike.Database,
): Transactor
export function createLocalstoreTransactor(
	database: FirestoreLike.Database,
	options: Options,
): Transactor

export function createLocalstoreTransactor(...args: Args) {
	if (isDatabase(args[0])) {
		const [db, ...rest] = args
		return new Transactor(db, firestoreModule, ...rest)
	} else return new Transactor(...(args as [] | [Options]))
}
