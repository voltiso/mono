// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable es-x/no-class-instance-fields */

import type * as Database from '@voltiso/firestore-like'
import type { MaybePromise } from '@voltiso/util'
import { $fastAssert, isDefined } from '@voltiso/util'
import { deepCloneData, newAutoId } from '@voltiso/util.firestore'
import type { Observable } from 'rxjs'

import type { CollectionReference } from './CollectionReference.js'
import { DocumentSnapshot } from './DocumentSnapshot.js'
import { LocalstoreError } from './Error.js'
import type { Localstore } from './Localstore.js'
import { Collection, Doc } from './Localstore.js'
import type { DocPath } from './Path.js'
import { applyUpdatesInPlace } from './util/applyUpdates.js'
import { getOrCreateDoc } from './util/index.js'
import { updateCollectionSubject } from './util/updateCollectionSubject.js'

function failTransactionFor(store: Localstore, path: DocPath) {
	const transaction = store._locks[path]?.transaction

	if (transaction) transaction._failed = true
}

export class DocumentReference implements Database.DocumentReference {
	_collectionRef: CollectionReference
	id: string // implements

	get path(): string {
		return `${this._collectionRef._path}/${this.id}`
	}

	get _store(): Localstore {
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
		this._set(deepCloneData(data))
	}

	_set(data: Database.DocumentData | null): void {
		const doc = getOrCreateDoc(this._store, this._collectionRef._path, this.id)
		doc.data$.next(data)

		const collection = this._store._collections[this._collectionRef._path]
		$fastAssert(collection)
		updateCollectionSubject(collection)

		failTransactionFor(this._store, this.path)
	}

	update(updates: Database.UpdateData): MaybePromise<void> {
		this._update(updates)
	}

	_update(updates: Database.UpdateData): void {
		const collections = this._store._collections
		const collectionPath = this._collectionRef._path

		if (!collections[collectionPath])
			throw new LocalstoreError(
				`NOT_FOUND: collection ${collectionPath} does not exist (error while updating doc with id '${this.id}')`,
			)

		const collection = collections[collectionPath]
		$fastAssert(collection)

		const doc = collection._docs[this.id]

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

		// eslint-disable-next-line no-multi-assign, @typescript-eslint/no-unnecessary-condition
		const collection = (collections[collectionPath] ||= new Collection())

		// eslint-disable-next-line no-multi-assign, @typescript-eslint/no-unnecessary-condition
		const doc = (collection._docs[this.id] ||= new Doc(null))

		return doc.data$
	}
}
