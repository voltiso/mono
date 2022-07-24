// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as Database from '@voltiso/firestore-like'

import { CollectionReference } from './CollectionReference.js'
import { DocumentReference } from './DocumentReference.js'
import type { Lock } from './Lock.js'
import type { DocPath } from './Path.js'
import { Transaction } from './Transaction.js'

// class Ref {
// 	__ref: string
// 	constructor(path: string) {
// 		this.__ref = path
// 	}
// }

type Path = string
type CollectionPath = Path

export class Doc {
	_data: Database.DocumentData

	constructor(data: Database.DocumentData) {
		this._data = data
	}
}

export class Collection {
	_docs: Record<string, Doc> = {}
}

export class Localstore implements Database.Database {
	_collections: Record<CollectionPath, Collection> = {}
	_locks: Record<DocPath, Lock> = {}

	collection(path: string): CollectionReference {
		return new CollectionReference(this, path)
	}

	doc(path: string): DocumentReference {
		const pathTokens = path.split('/')
		const collectionPath = pathTokens.slice(0, -1).join('/')
		const id = pathTokens.at(-1) as string
		return new DocumentReference(this.collection(collectionPath), id)
	}

	async runTransaction<R>(
		body: (transaction: Database.Transaction) => Promise<R>,
	): Promise<R> {
		const transaction = new Transaction(this)
		try {
			const r = await body(transaction)
			transaction._commit()
			return r
		} finally {
			transaction._cleanup()
		}
	}
}

export function createLocalstore() {
	return new Localstore()
}
