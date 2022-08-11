// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import type * as Database from '@voltiso/firestore-like'
import { undef } from '@voltiso/util'

import type { Data, Id } from '~/Data'
import type { WithDb } from '~/Db'
import type { IDoc, IDocConstructor, IDocTI } from '~/Doc'
import type { ExecutionContext } from '~/Doc/_/ExecutionContext'
import type { GDataPublicInput } from '~/Doc/_/GData'
import type { GDoc, GO } from '~/Doc/_/GDoc'
import type { IndexedDoc } from '~/Doc/IndexedDoc'
import { CollectionPath, concatPath } from '~/Path'
import { WeakDocRef } from '~/Ref'
import type { WithTransactor } from '~/Transactor'

import type { CollectionRef as ICollectionRef } from './CollectionRef'
import type { InferTI } from './InferTI'

type Context = WithTransactor & WithDb

class CollectionRef<
	D extends IDoc,
	Ctx extends ExecutionContext = 'outside',
	TI extends IDocTI = InferTI<D>,
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
		return Object.setPrototypeOf((id: Id<D>) => {
			return this._context.db.doc(
				this._path.toString(),
				id,
			) as unknown as TI extends any ? WeakDocRef<GO<TI>> : never
		}, this) as never
	}

	add(
		data: TI extends any ? Data<GDataPublicInput<TI>> : never,
	): PromiseLike<GDoc<TI, Ctx>> {
		// data = data || {}

		const id = data.id as string | undefined
		$assert(id === undef || typeof id === 'string')

		const ref = this._context.transactor._database.collection(
			this._path.toString(),
		)

		const docRef: Database.DocumentReference = id ? ref.doc(id) : ref.doc()
		const path = docRef.path
		const docPath = new WeakDocRef<IndexedDoc>(this._context, path)

		// const dataWithId: DataWithId = { ...data, id: docRef.id }
		// const dataWithoutId: Data = omit(dataWithId, 'id')

		return docPath.set(data) as never
	}

	register<Cls extends IDocConstructor>(
		cls: Cls,
	): ICollectionRef<InstanceType<Cls>> {
		// console.log('register', cls._)
		const { db } = this._context
		const _ = cls._
		const docPattern = db.docPattern(this._path, '*')

		if (Object.keys(_.const).length > 0) docPattern.const(_.const)

		if (Object.keys(_.public).length > 0) docPattern.public(_.public)

		if (Object.keys(_.private).length > 0) docPattern.private(_.private)

		if (Object.keys(_.protected).length > 0) docPattern.protected(_.protected)

		for (const after of _.afters) docPattern.after(after)

		for (const beforeCommit of _.beforeCommits)
			docPattern.beforeCommit(beforeCommit)

		for (const onGet of _.onGets) docPattern.onGet(onGet)

		for (const [name, method] of Object.entries(_.methods))
			docPattern.method(name, method as never)

		return this as never
	}
}

export { CollectionRef as CollectionRef_ }
