// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable es-x/no-class-instance-fields */

// import chalk from 'chalk'
import * as Database from '@voltiso/firestore-like'
import { $fastAssert, isDefined } from '@voltiso/util'
import { deepCloneData } from '@voltiso/util.firestore'

import type { DocumentReference } from './DocumentReference.js'
import { DocumentSnapshot } from './DocumentSnapshot.js'
import { CongestionError, LocalstoreError } from './Error.js'
import type { Localstore } from './Localstore.js'
import { Lock } from './Lock.js'
import type { DocPath } from './Path.js'
import { applyUpdatesInPlace } from './util/applyUpdates.js'

function fail(_store: Localstore) {
	// console.log(
	// 	'\n',
	// 	chalk.bold.bgRed.inverse('  LOCALSTORE   '),
	// 	'\n',
	// 	chalk.bold.bgRed.inverse(' checkIfFailed '),
	// 	'\n',
	// 	chalk.blue(
	// 		dump({
	// 			collections: store._collections,
	// 		}),
	// 	),
	// 	chalk.magenta(
	// 		dump({
	// 			locks: store._locks,
	// 		}),
	// 	),
	// )
	throw new CongestionError()
}

function checkIfFailed(t: Transaction) {
	if (t._failed) fail(t._store)
}

function getData(lock: Lock, ref: DocumentReference) {
	return isDefined(lock.data) ? lock.data : ref._get().data() || null
}

function getLock(store: Localstore, transaction: Transaction, path: DocPath) {
	let lock = store._locks[path]

	const lockedByOther = lock && lock.transaction !== transaction

	if (lockedByOther) fail(store)

	if (lock) $fastAssert(lock.transaction === transaction)
	// eslint-disable-next-line no-multi-assign
	else lock = store._locks[path] = new Lock(transaction, undefined)

	return lock
}

export class Transaction implements Database.Transaction {
	_store: Localstore
	_failed = false

	constructor(store: Localstore) {
		this._store = store
	}

	// get(ref: DocumentReference): DocumentSnapshot
	// get(ref: Database.Query): Database.QuerySnapshot

	get(ref: DocumentReference): DocumentSnapshot /* | QuerySnapshot*/ {
		checkIfFailed(this)

		if (Database.isDocumentReference(ref)) {
			const lock = getLock(this._store, this, ref.path)
			const data = getData(lock, ref)
			return new DocumentSnapshot(data || undefined)
		} else {
			throw new Error('not implemented')
		}
	}

	set(ref: DocumentReference, data: Database.DocumentData): void {
		checkIfFailed(this)

		const lock = getLock(this._store, this, ref.path)
		lock.data = deepCloneData(data)
	}

	update(ref: DocumentReference, updates: Database.UpdateData): void {
		checkIfFailed(this)

		const lock = getLock(this._store, this, ref.path)
		const data = getData(lock, ref)

		if (!data)
			throw new LocalstoreError(
				`NOT_FOUND: document ${ref.path} does not exist (cannot update)`,
			)

		if (!lock.data) {
			lock.data = deepCloneData(data)
		}

		applyUpdatesInPlace(lock.data, updates)
	}

	delete(ref: DocumentReference): void {
		checkIfFailed(this)

		const lock = getLock(this._store, this, ref.path)
		lock.data = null
	}

	_commit(): void {
		checkIfFailed(this)

		for (const [path, lock] of Object.entries(this._store._locks)) {
			if (lock.transaction !== this) continue

			const docRef = this._store.doc(path)

			if (lock.data === null) docRef._delete()
			else if (lock.data) docRef._set(lock.data)

			// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
			delete this._store._locks[path]
		}
	}

	_cleanup(): void {
		for (const [path, lock] of Object.entries(this._store._locks)) {
			// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
			if (lock.transaction === this) delete this._store._locks[path]
		}
	}
}
