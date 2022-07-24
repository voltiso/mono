// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Options } from '@voltiso/transactor'
import { Transactor } from '@voltiso/transactor'
import type { Firestore } from 'firebase-admin/firestore'
import { FieldValue, Timestamp } from 'firebase-admin/firestore'

const firestoreModule = {
	FieldValue,
	Timestamp,
}

type Args = [] | [Options] | [Firestore] | [Firestore, Options]

function isFirestore(x: unknown): x is Firestore {
	// eslint-disable-next-line @typescript-eslint/unbound-method
	return Boolean((x as Firestore | null)?.recursiveDelete)
}

export function createFirestoreTransactor(): Transactor
export function createFirestoreTransactor(options: Options): Transactor
export function createFirestoreTransactor(firestore: Firestore): Transactor
export function createFirestoreTransactor(
	firestore: Firestore,
	options: Options,
): Transactor

export function createFirestoreTransactor(...args: Args) {
	if (isFirestore(args[0])) {
		const [db, ...rest] = args
		return new Transactor(db, firestoreModule, ...rest)
	} else return new Transactor(...(args as [] | [Options]))
}
