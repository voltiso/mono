// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable security/detect-object-injection */

import type * as Database from '@voltiso/firestore-like'
import type { MaybePromise } from '@voltiso/util'
import { $assert, isDefined } from '@voltiso/util'
import { deepCloneData, newAutoId } from '@voltiso/util.firestore'
import type { Observable } from 'rxjs'

import type { CollectionReference } from './CollectionReference'
import { DocumentSnapshot } from './DocumentSnapshot'
import { LocalstoreError } from './Error'
import type { Localstore } from './Localstore'
import { Collection, Doc } from './Localstore'
import type { DocPath } from './Path'
import { getOrCreateDoc } from './util'
import { applyUpdatesInPlace } from './util/applyUpdates'
import { updateCollectionSubject } from './util/updateCollectionSubject'

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
		const data =
			this._store._collections[this._collectionRef._path]?._docs[this.id]?.data$
				.value

		return new DocumentSnapshot(data === null ? undefined : data)
	}

	set(data: Database.DocumentData): MaybePromise<void> {
		return this._set(deepCloneData(data))
	}

	_set(data: Database.DocumentData | null) {
		const doc = getOrCreateDoc(this._store, this._collectionRef._path, this.id)
		doc.data$.next(data)

		const collection = this._store._collections[this._collectionRef._path]
		$assert(collection)
		updateCollectionSubject(collection)

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
		$assert(collection)

		const doc = collection._docs[id]

		if (!doc?.data$.value)
			throw new LocalstoreError(
				`NOT_FOUND: document ${this.path} does not exist (cannot update)`,
			)

		const newData = { ...doc.data$.value }
		applyUpdatesInPlace(newData, updates)
		doc.data$.next(newData)
		updateCollectionSubject(collection)

		failTransactionFor(this._store, this.path)
	}

	delete(): MaybePromise<void> {
		this._delete()
	}

	_delete(): void {
		this._set(null)
	}

	get data$(): Observable<Database.DocumentData | null> {
		const collections = this._store._collections
		const collectionPath = this._collectionRef._path

		// eslint-disable-next-line no-multi-assign
		const collection = (collections[collectionPath] ||= new Collection())

		// eslint-disable-next-line no-multi-assign
		const doc = (collection._docs[this.id] ||= new Doc(null))

		return doc.data$
	}
}
