// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
// import chalk from 'chalk'
import * as Database from '@voltiso/firestore-like'
import { deepClone, isDefined, undef } from '@voltiso/util'

import type { DocumentReference } from './DocumentReference'
import { DocumentSnapshot } from './DocumentSnapshot'
import { CongestionError, LocalstoreError } from './Error'
import type { Localstore } from './Localstore'
import { Lock } from './Lock'
import type { DocPath } from './Path'
import { applyUpdatesInPlace } from './util/applyUpdates'

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
	// eslint-disable-next-line security/detect-object-injection
	let lock = store._locks[path]

	const lockedByOther = lock && lock.transaction !== transaction

	if (lockedByOther) fail(store)

	if (lock) assert(lock.transaction === transaction)
	// eslint-disable-next-line no-multi-assign, security/detect-object-injection
	else lock = store._locks[path] = new Lock(transaction, undef)

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
			return new DocumentSnapshot(data || undef)
		} else {
			throw new Error('not implemented')
		}
	}

	set(ref: DocumentReference, data: Database.DocumentData): void {
		checkIfFailed(this)

		const lock = getLock(this._store, this, ref.path)
		// console.log('Transaction.set', ref, data, 'deepClone')
		lock.data = deepClone(data)
	}

	update(ref: DocumentReference, updates: Database.UpdateData): void {
		checkIfFailed(this)

		const lock = getLock(this._store, this, ref.path)
		const data = getData(lock, ref)

		if (data === null)
			throw new LocalstoreError(
				`NOT_FOUND: document ${ref.path} does not exist (cannot update)`,
			)

		let newData = data
		if (data !== lock.data) {
			// console.log('Transaction.update', ref, updates, 'deepClone')
			newData = deepClone(data)
		}

		applyUpdatesInPlace(newData, updates)
	}

	delete(ref: DocumentReference): void {
		checkIfFailed(this)

		const lock = getLock(this._store, this, ref.path)
		lock.data = null
	}

	_commit() {
		checkIfFailed(this)

		for (const [path, lock] of Object.entries(this._store._locks)) {
			if (lock.transaction !== this) continue

			const docRef = this._store.doc(path)

			if (lock.data === null) docRef._delete()
			else if (lock.data) docRef._set(lock.data)

			// eslint-disable-next-line security/detect-object-injection
			delete this._store._locks[path]
		}
	}

	_cleanup() {
		for (const [path, lock] of Object.entries(this._store._locks)) {
			// eslint-disable-next-line security/detect-object-injection
			if (lock.transaction === this) delete this._store._locks[path]
		}
	}
}
