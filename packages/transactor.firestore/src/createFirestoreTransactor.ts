// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { TransactorOptions } from '@voltiso/transactor'
import { Transactor } from '@voltiso/transactor'
import type { Firestore } from 'firebase-admin/firestore'
import { FieldValue, Timestamp } from 'firebase-admin/firestore'

const firestoreModule = {
	FieldValue,
	Timestamp,
}

type Args =
	| []
	| [Partial<TransactorOptions>]
	| [Firestore]
	| [Firestore, Partial<TransactorOptions>]

function isFirestore(x: unknown): x is Firestore {
	return Boolean((x as Firestore | null)?.recursiveDelete)
}

//

export function createFirestoreTransactor(): Transactor

export function createFirestoreTransactor(
	options: Partial<TransactorOptions>,
): Transactor

export function createFirestoreTransactor(firestore: Firestore): Transactor

export function createFirestoreTransactor(
	firestore: Firestore,
	options: Partial<TransactorOptions>,
): Transactor

//

export function createFirestoreTransactor(...args: Args): Transactor {
	if (isFirestore(args[0])) {
		const [db, ...rest] = args
		return new Transactor(db, firestoreModule, ...rest)
	} else return new Transactor(...(args as [] | [Partial<TransactorOptions>]))
}
