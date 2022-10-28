// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { CALL, BoundCallable, staticImplements } from '@voltiso/util'

import { CollectionRef } from '~/CollectionRef/CollectionRef'
import { CollectionRefPattern } from '~/CollectionRef/CollectionRefPattern'
import type { IndexedDoc } from '~/Doc'
import { DocRefPattern, WeakDocRef } from '~/DocRef'
import type { DbPathFromString } from '~/Path'
import { concatPath, DocPath } from '~/Path'

import type { CanonicalPath } from './CanonicalPath'
import type { DbContext, DbParentContext } from './Context'
import type { DbConstructor } from './DbConstructor'

export interface Db {
	<Tokens extends readonly string[]>(
		...pathTokens: Tokens
	): DbPathFromString<CanonicalPath<Tokens>>

	// (docPath: DocPath): WeakDocRef<IndexedDoc>
}

/** In transaction or not */
@staticImplements<DbConstructor<Db>>()
export class Db {
	private _context: DbContext

	constructor(parentContext: DbParentContext) {
		this._context = { ...parentContext, db: this as never }
		const newThis = BoundCallable(this)
		newThis._context.db = newThis
		// eslint-disable-next-line no-constructor-return
		return newThis
	}

	[CALL](...args: string[] | [DocPath]) {
		if (args[0] instanceof DocPath)
			return new WeakDocRef(this._context, args[0] as never) as never

		const path = args.join('/')

		const newPathTokens = path.split('/')

		if (path.includes('*') || path.includes('{')) {
			// pattern
			if (newPathTokens.length % 2 === 1)
				return new CollectionRefPattern(this._context, path) as never
			else return new DocRefPattern(this._context, path) as never
		} else if (newPathTokens.length % 2 === 1)
			return new CollectionRef(this._context, path) as never
		else return new WeakDocRef(this._context, path) as never
	}

	doc(...pathTokens: readonly string[]): WeakDocRef<IndexedDoc> {
		// $assert(this.context)
		return new WeakDocRef(this._context, concatPath(pathTokens)) as never
	}

	collection(...pathTokens: readonly string[]): CollectionRef<IndexedDoc> {
		// $assert(this.context)
		return new CollectionRef(this._context, pathTokens) as never
	}

	docPattern(
		...pathTokens: readonly {
			toString: () => string
		}[]
	): DocRefPattern {
		// $assert(this.context)
		return new DocRefPattern(
			this._context,
			...pathTokens.map(s => s.toString()),
		)
	}
}
