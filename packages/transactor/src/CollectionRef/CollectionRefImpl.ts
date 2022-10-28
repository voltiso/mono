// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import type * as Database from '@voltiso/firestore-like'
import * as s from '@voltiso/schemar'

import type { Id, WithId } from '~/Data'
import type { WithDb } from '~/Db'
import type { Doc, $$DocConstructor, DocTI, IDoc, GetDoc } from '~/Doc'
import type { ExecutionContext } from '~/Doc/_/ExecutionContext'
import type { GO } from '~/Doc/_/GDoc'
import type { IndexedDoc } from '~/Doc/IndexedDoc'
import { WeakDocRef } from '~/DocRef'
import { CollectionPath, concatPath } from '~/Path'
import type { WithTransactor } from '~/Transactor'

import type { CollectionRef } from './CollectionRef'
import type { InferTI } from './InferTI'
import { $AssumeType } from '@voltiso/util'

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

	add(data: WithId): PromiseLike<Doc<TI, Ctx>> {
		$AssumeType<{ id?: string }>(data)
		const id = data.id
		assert(s.number.or(undefined), id)

		const ref = this._context.transactor._database.collection(
			this._path.toString(),
		)

		const docRef: Database.DocumentReference = id ? ref.doc(id) : ref.doc()
		const { path } = docRef
		const docPath = new WeakDocRef<IndexedDoc>(this._context, path)

		return docPath.set(data as never) as never
	}

	register<Cls extends $$DocConstructor>(cls: Cls): CollectionRef<GetDoc<Cls>> {
		const { db } = this._context
		const docPattern = db.docPattern(this._path, '*')

		docPattern.register(cls)

		return this as never
	}
}
