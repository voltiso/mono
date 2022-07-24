// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as Database from '@voltiso/firestore-like'

import { DocumentReference } from './DocumentReference'
import type { Localstore } from './Localstore'

export class CollectionReference implements Database.CollectionReference {
	_store: Localstore
	_path: string

	constructor(store: Localstore, path: string) {
		this._store = store
		this._path = path
	}

	doc(id?: string) {
		return new DocumentReference(this, id)
	}
}
