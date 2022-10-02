// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as Database from '@voltiso/firestore-like'
import type { Observable } from 'rxjs'

import { DocumentReference } from './DocumentReference'
import type { Localstore } from './Localstore'
import { getOrCreateCollection } from './util'

export class CollectionReference implements Database.CollectionReference {
	_store: Localstore
	_path: string

	get docs$(): Observable<Record<string, Database.DocumentData>> {
		const collection = getOrCreateCollection(this._store, this._path)
		return collection._docs$
	}

	constructor(store: Localstore, path: string) {
		this._store = store
		this._path = path
	}

	doc(id?: string) {
		return new DocumentReference(this, id)
	}
}
