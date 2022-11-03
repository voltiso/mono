// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Options } from '@voltiso/transactor'
import { Transactor } from '@voltiso/transactor'
import { initializeApp } from 'firebase-admin/app'
import type { Firestore } from 'firebase-admin/firestore'
import { FieldValue, getFirestore, Timestamp } from 'firebase-admin/firestore'
import mockConsole from 'jest-mock-console'

// console.log('FIRESTORE_EMULATOR_HOST', process.env['FIRESTORE_EMULATOR_HOST'])

mockConsole()

initializeApp({ projectId: 'firestore-transactor' })

export const firestore = getFirestore()

// export * as firestoreContext from 'firebase-admin/firestore'
export const firestoreModule = {
	FieldValue,
	Timestamp,
}

export function createFirestoreTransactor(
	firestore: Firestore,
	options?: Options | undefined,
) {
	return new Transactor(firestore, firestoreModule, options)
}
