// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable security/detect-object-injection */

import { assert } from '@voltiso/assertor'
import type * as Database from '@voltiso/firestore-like'
import type { MaybePromise } from '@voltiso/util'
import { deepClone, isDefined } from '@voltiso/util'

import type { CollectionReference } from './CollectionReference'
import { DocumentSnapshot } from './DocumentSnapshot'
import { LocalstoreError } from './Error'
import type { Localstore } from './Localstore'
import { Collection, Doc } from './Localstore'
import type { DocPath } from './Path'
import { applyUpdatesInPlace } from './util/applyUpdates'
import { newAutoId } from './util/newAutoId'

function failTransactionFor(store: Localstore, path: DocPath) {
	const transaction = store._locks[path]?.transaction

	if (transaction) transaction._failed = true
}

export class DocumentReference implements Database.DocumentReference {
	_collectionRef: CollectionReference
	id: string // implements

	get path() {
		return `${this._collectionRef._path}/${this.id}`
	}

	get _store() {
		return this._collectionRef._store
	}

	constructor(collection: CollectionReference, id?: string) {
		this._collectionRef = collection
		this.id = isDefined(id) ? id : newAutoId()
	}

	clone(): DocumentReference {
		return new DocumentReference(this._collectionRef, this.id)
	}

	get(): MaybePromise<DocumentSnapshot> {
		return this._get()
	}

	_get(): DocumentSnapshot {
		return new DocumentSnapshot(
			this._store._collections[this._collectionRef._path]?._docs[
				this.id
			]?._data,
		)
	}

	set(data: Database.DocumentData): MaybePromise<void> {
		return this._set(data)
	}

	_set(data: Database.DocumentData) {
		const collections = this._store._collections
		const collectionPath = this._collectionRef._path
		const id = this.id

		if (!collections[collectionPath])
			collections[collectionPath] = new Collection()

		const collection = collections[collectionPath]

		assert(collection)

		if (!collection._docs[id]) collection._docs[id] = new Doc({})

		const doc = collection._docs[id]

		assert(doc)

		// console.log('DocumentReference.set', data, 'deepClone')

		doc._data = deepClone(data)

		failTransactionFor(this._store, this.path)
	}

	update(updates: Database.UpdateData): MaybePromise<void> {
		return this._update(updates)
	}

	_update(updates: Database.UpdateData) {
		const collections = this._store._collections
		const collectionPath = this._collectionRef._path
		const id = this.id

		if (!collections[collectionPath])
			throw new LocalstoreError(
				`NOT_FOUND: collection ${collectionPath} does not exist (error while updating doc with id '${this.id}')`,
			)

		const collection = collections[collectionPath]
		assert(collection)

		const doc = collection._docs[id]

		if (!doc)
			throw new LocalstoreError(
				`document ${this.path} does not exist (cannot update)`,
			)

		applyUpdatesInPlace(doc._data, updates)

		failTransactionFor(this._store, this.path)
	}

	delete(): MaybePromise<void> {
		return this._delete()
	}

	_delete() {
		const collections = this._store._collections
		const collectionPath = this._collectionRef._path
		const id = this.id

		if (!collections[collectionPath]) return

		const collection = collections[collectionPath]
		assert(collection)

		delete collection._docs[id]

		failTransactionFor(this._store, this.path)
	}
}
