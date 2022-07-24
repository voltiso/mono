// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Options } from '@voltiso/transactor'
import { createTransactor } from '@voltiso/transactor'
import { initializeApp } from 'firebase-admin/app'
import type { Firestore } from 'firebase-admin/firestore'
import { FieldValue, getFirestore, Timestamp } from 'firebase-admin/firestore'

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
	return createTransactor(firestore, firestoreModule, options)
}
