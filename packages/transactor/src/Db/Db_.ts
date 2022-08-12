// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OmitCall } from '@voltiso/util'
import { CALL, callableInstance, staticImplements } from '@voltiso/util'

import { CollectionRef, CollectionRefPattern } from '~'
import type { IndexedDoc } from '~/Doc'
import type { DbPathFromString } from '~/Path'
import { concatPath, DocPath } from '~/Path'
import { DocRefPattern, WeakDocRef } from '~/Ref'

import type { CanonicalPath } from './CanonicalPath'
import type { DbContext, DbParentContext } from './Context'
import type { Db as IDb } from './Db.type'
import type { DbConstructor } from './DbConstructor'

export type DbCallArgs = readonly string[] | readonly [DocPath]

export type DbCallResult<Args> = Args extends readonly string[]
	? DbPathFromString<CanonicalPath<Args>>
	: WeakDocRef<IndexedDoc>

/** In transaction or not */
@staticImplements<DbConstructor<Db>>()
class Db implements OmitCall<IDb> {
	_context: DbContext

	constructor(parentContext: DbParentContext) {
		this._context = { ...parentContext, db: this as never }
		const newThis = callableInstance(this)
		newThis._context.db = newThis
		// eslint-disable-next-line no-constructor-return
		return newThis
	}

	[CALL]<Tokens extends readonly string[]>(
		...pathTokens: Tokens
	): DbPathFromString<CanonicalPath<Tokens>>

	[CALL](docPath: DocPath): WeakDocRef<IndexedDoc>

	[CALL]<Args extends DbCallArgs>(...pathTokens: Args): DbCallResult<Args> {
		const path = pathTokens.join('/')

		if (pathTokens[0] instanceof DocPath)
			return new WeakDocRef<IndexedDoc>(
				this._context,
				path,
			) as unknown as DbCallResult<Args>

		const newPathTokens = path.split('/')

		if (path.includes('*') || path.includes('{')) {
			// pattern
			if (newPathTokens.length % 2 === 1)
				return new CollectionRefPattern(this._context, path) as never
			else return new DocRefPattern(this._context, path) as never
		} else if (newPathTokens.length % 2 === 1)
			return new CollectionRef(this._context, path) as never
		else return new WeakDocRef<IndexedDoc>(this._context, path) as never
	}

	doc(...pathTokens: readonly string[]): WeakDocRef<IndexedDoc> {
		// $assert(this.context)
		return new WeakDocRef<IndexedDoc>(this._context, concatPath(pathTokens))
	}

	collection(...pathTokens: readonly string[]): CollectionRef<IndexedDoc> {
		// $assert(this.context)
		return new CollectionRef<IndexedDoc>(this._context, pathTokens)
	}

	docPattern(
		...pathTokens: readonly { toString: () => string }[]
	): DocRefPattern {
		// $assert(this.context)
		return new DocRefPattern(
			this._context,
			...pathTokens.map(s => s.toString()),
		)
	}
}

export type Db_ = Db & Db[CALL]
export const Db_ = Db as DbConstructor<Db_>
