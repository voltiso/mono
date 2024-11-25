// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable es-x/no-class-instance-fields */

import type * as Database from '@voltiso/firestore-like'
import type { Observable } from 'rxjs'

import { DocumentReference } from './DocumentReference.js'
import type { Localstore } from './Localstore.js'
import { getOrCreateCollection } from './util/index.js'

export class CollectionReference implements Database.CollectionReference {
	_store: Localstore
	_path: string

	constructor(store: Localstore, path: string) {
		this._store = store
		this._path = path
	}

	get docs$(): Observable<Record<string, Database.DocumentData>> {
		const collection = getOrCreateCollection(this._store, this._path)
		return collection._docs$
	}

	doc(id?: string): DocumentReference {
		return new DocumentReference(this, id)
	}
}
