// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import type * as Database from '@voltiso/firestore-like'
import * as s from '@voltiso/schemar'
import type { NewableReturn_, Throw } from '@voltiso/util'

import type { DocIdString } from '~/brand'
import type { WithDb } from '~/Db'
import type { $$Doc, GetPublicCreationInputData } from '~/Doc'
import type { ExecutionContext } from '~/Doc/_/ExecutionContext'
import type { $$DocConstructor } from '~/DocConstructor'
import type { WeakDocRef } from '~/DocRef'
import { CustomDocRef } from '~/DocRef'
import type { $$DocRelated, GetDoc, GetDocTag } from '~/DocRelated'
import type { DocTag } from '~/DocTypes'
import { CollectionPath, concatPath } from '~/Path'
import type { WithTransactor } from '~/Transactor'

type Context = WithTransactor & WithDb

/** Collection reference */
export interface CollectionRef<
	R extends $$DocRelated,
	_Ctx extends ExecutionContext = 'outside',
> {
	/** Get Doc reference by Id */
	(id: DocIdString<R>): WeakDocRef<R>

	/** Get Doc reference by Id */
	<tag extends DocTag>(id: DocIdString<tag>): Throw<
		'wrong Id type' & { doc: tag }
	>

	/** Get Doc reference by Id */
	(id: string): WeakDocRef<R>
}

/** Collection reference */
export class CollectionRef<
	R extends $$DocRelated,
	_Ctx extends ExecutionContext = 'outside',
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
			(id: DocIdString<R>) =>
				this._context.db.doc(
					this._path.toString(),
					id,
				) as unknown as R extends any ? WeakDocRef<GetDocTag<R>> : never,
			this,
		) as never
	}

	/** Add Doc to this Collection */
	add(data: GetPublicCreationInputData<R>): PromiseLike<GetDoc<R>> {
		// CustomDoc<TI, Ctx>

		// $AssumeType<{ id?: string }>(data)
		const id = data.id
		assert(s.string.or(undefined), id)

		const ref = this._context.transactor._database.collection(
			this._path.toString(),
		)

		const docRef: Database.DocumentReference = id ? ref.doc(id) : ref.doc()
		const { path } = docRef
		const docPath = new CustomDocRef(this._context, path, { isStrong: false })
		return docPath.create(data as never) as never
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
