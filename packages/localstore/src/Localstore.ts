// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocumentData } from '@voltiso/firestore-like'
import type * as Database from '@voltiso/firestore-like'
import { BehaviorSubject } from 'rxjs'

import { CollectionReference } from './CollectionReference'
import { DocumentReference } from './DocumentReference'
import type { Lock } from './Lock'
import type { CollectionPath, DocPath } from './Path'
import { Transaction } from './Transaction'

export class Doc {
	// eslint-disable-next-line rxjs/no-exposed-subjects
	data$: BehaviorSubject<Database.DocumentData | null>

	constructor(data: Database.DocumentData | null) {
		// eslint-disable-next-line rxjs/no-explicit-generics
		this.data$ = new BehaviorSubject<Database.DocumentData | null>(data)
	}
}

export class Collection {
	_docs: Record<string, Doc> = {}

	// eslint-disable-next-line rxjs/no-exposed-subjects
	_docs$: BehaviorSubject<Record<string, DocumentData>>

	constructor() {
		this._docs$ = new BehaviorSubject<Record<string, DocumentData>>({})
	}
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
