// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { TransactorOptions } from '@voltiso/transactor'
import { Transactor } from '@voltiso/transactor'
import { initializeApp } from 'firebase-admin/app'
import type { Firestore } from 'firebase-admin/firestore'
import { FieldValue, getFirestore, Timestamp } from 'firebase-admin/firestore'

// console.log('FIRESTORE_EMULATOR_HOST', process.env['FIRESTORE_EMULATOR_HOST'])

initializeApp({ projectId: 'firestore-transactor' })

export const firestore = getFirestore()

// export * as firestoreContext from 'firebase-admin/firestore'
export const firestoreModule = {
	FieldValue,
	Timestamp,
}

export function createFirestoreTransactor(
	firestore: Firestore,
	options?: Partial<TransactorOptions> | undefined,
): Transactor {
	return new Transactor(firestore, firestoreModule, options)
}
