// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import type * as Database from '@voltiso/firestore-like'

import type { Id } from '~/Data'
import type { WithDb } from '~/Db'
import type { Doc, DocConstructorLike, DocTI, IDoc } from '~/Doc'
import type { ExecutionContext } from '~/Doc/_/ExecutionContext'
import type { GetPublicCreationInputData } from '~/Doc/_/GData'
import type { GO } from '~/Doc/_/GDoc'
import type { IndexedDoc } from '~/Doc/IndexedDoc'
import { WeakDocRef } from '~/DocRef'
import { CollectionPath, concatPath } from '~/Path'
import type { WithTransactor } from '~/Transactor'

import type { CollectionRef } from './CollectionRef'
import type { InferTI } from './InferTI'

type Context = WithTransactor & WithDb

export class CollectionRefImpl<
	D extends IDoc,
	Ctx extends ExecutionContext = 'outside',
	TI extends DocTI = InferTI<D>,
> {
	// [DTI]: TI
	private readonly _context: Context

	private readonly _path: CollectionPath
	get path(): CollectionPath {
		return this._path
	}

	constructor(context: Context, input: readonly string[] | string) {
		this._context = context

		// eslint-disable-next-line no-param-reassign
		if (typeof input === 'string') input = [input]

		this._path = new CollectionPath(concatPath(input))

		// eslint-disable-next-line no-constructor-return
		return Object.setPrototypeOf(
			(id: Id<D>) =>
				this._context.db.doc(
					this._path.toString(),
					id,
				) as unknown as TI extends any ? WeakDocRef<GO<TI>> : never,
			this,
		) as never
	}

	add(data: GetPublicCreationInputData<TI, D>): PromiseLike<Doc<TI, Ctx>> {
		// data = data || {}

		const id = data.id
		$assert(id === undefined || typeof id === 'string')

		const ref = this._context.transactor._database.collection(
			this._path.toString(),
		)

		const docRef: Database.DocumentReference = id ? ref.doc(id) : ref.doc()
		const { path } = docRef
		const docPath = new WeakDocRef<IndexedDoc>(this._context, path)

		// const dataWithId: DataWithId = { ...data, id: docRef.id }
		// const dataWithoutId: Data = omit(dataWithId, 'id')

		return docPath.set(data) as never
	}

	register<Cls extends DocConstructorLike>(
		cls: Cls,
	): CollectionRef<InstanceType<Cls>> {
		const { db } = this._context
		const docPattern = db.docPattern(this._path, '*')

		docPattern.register(cls)

		return this as never
	}
}
