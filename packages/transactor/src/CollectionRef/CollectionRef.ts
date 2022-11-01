// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import type * as Database from '@voltiso/firestore-like'
import * as s from '@voltiso/schemar'
import type { NewableReturn_, Throw } from '@voltiso/util'

import type { DocIdString } from '~/Data'
import type { WithDb } from '~/Db'
import type {
	$$Doc,
	$$DocConstructor,
	$$DocTI,
	CustomDoc,
	GetDocTag,
	GetPublicCreationInputData,
	IDoc,
} from '~/Doc'
import type { ExecutionContext } from '~/Doc/_/ExecutionContext'
import type { CustomWeakDocRef } from '~/DocRef'
import { DocRef } from '~/DocRef'
import { CollectionPath, concatPath } from '~/Path'
import type { WithTransactor } from '~/Transactor'

import type { InferTI, InferTIFromDoc } from './InferTI'

type Context = WithTransactor & WithDb

/** Collection reference */
export interface CollectionRef<
	D extends $$Doc,
	Ctx extends ExecutionContext = 'outside',
	TI extends $$DocTI = InferTI<D>,
> {
	/** Get Doc reference by Id */
	(id: DocIdString<D>): CustomWeakDocRef<{ doc: GetDocTag<D> }>

	<DD extends $$Doc>(id: DocIdString<DD>): DD extends any
		? IDoc extends DD
			? CustomWeakDocRef<{ doc: GetDocTag<D> }>
			: Throw<'wrong Id type' & { Doc: DD }>
		: never
}

/** Collection reference */
export class CollectionRef<
	D extends $$Doc,
	Ctx extends ExecutionContext = 'outside',
	TI extends $$DocTI = InferTI<D>,
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
			(id: DocIdString<D>) =>
				this._context.db.doc(
					this._path.toString(),
					id,
				) as unknown as TI extends any
					? CustomWeakDocRef<{ doc: GetDocTag<TI> }>
					: never,
			this,
		) as never
	}

	/** Add Doc to this Collection */
	add(
		data: GetPublicCreationInputData<InferTIFromDoc<D>>,
	): PromiseLike<CustomDoc<TI, Ctx>> {
		// $AssumeType<{ id?: string }>(data)
		const id = data.id
		assert(s.number.or(undefined), id)

		const ref = this._context.transactor._database.collection(
			this._path.toString(),
		)

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		const docRef: Database.DocumentReference = id ? ref.doc(id) : ref.doc()
		const { path } = docRef
		const docPath = new DocRef(this._context, path, { isStrong: false })
		return docPath.set(data as never) as never
	}

	/** Register Doc class/type for this Collection */
	register<Cls extends $$DocConstructor>(
		cls: Cls,
	): CollectionRef<
		NewableReturn_<Cls> extends $$Doc ? NewableReturn_<Cls> : never
	> {
		const { db } = this._context
		const docPattern = db.docPattern(this._path, '*')

		docPattern.register(cls)

		return this as never
	}
}
