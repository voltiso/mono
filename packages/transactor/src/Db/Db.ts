// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { BoundCallable, CALL } from '@voltiso/util'

import { CollectionRef } from '~/CollectionRef/CollectionRef'
import { CollectionRefPattern } from '~/CollectionRef/CollectionRefPattern'
import type { IndexedDoc } from '~/Doc'
import type { GetDocRef, WeakDocRef } from '~/DocRef'
import { CustomDocRef, DocRefPattern } from '~/DocRef'
import type { AnyDoc } from '~/DocTypes'
import type { DbPathFromString, DocPath } from '~/Path'
import { concatPath, CustomDocPath } from '~/Path'

import type { CanonicalPath } from './CanonicalPath'
import type { DbContext, DbParentContext } from './Context'

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface Db {
	<Tokens extends readonly string[]>(
		...pathTokens: Tokens
	): DbPathFromString<CanonicalPath<Tokens>>

	(docPath: DocPath): WeakDocRef<IndexedDoc>
}

/** In transaction or not */
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class Db {
	protected _context: DbContext

	constructor(parentContext: DbParentContext) {
		this._context = { ...parentContext, db: this as never }
		const newThis = BoundCallable(this)
		newThis._context.db = newThis
		// eslint-disable-next-line no-constructor-return
		return newThis
	}

	[CALL](...args: string[] | [DocPath]): unknown {
		if (args[0] instanceof CustomDocPath) {
			return new CustomDocRef(this._context, args[0].toString(), {
				isStrong: false,
			}) as never
		}

		const path = args.join('/')

		const newPathTokens = path.split('/')

		if (path.includes('*') || path.includes('{')) {
			// pattern
			if (newPathTokens.length % 2 === 1)
				return new CollectionRefPattern(this._context, path) as never
			else return new DocRefPattern(this._context, path) as never
		} else if (newPathTokens.length % 2 === 1)
			return new CollectionRef(this._context, path) as never
		else {
			return new CustomDocRef(this._context, path, { isStrong: false }) as never
		}
	}

	doc(
		...pathTokens: readonly string[]
	): GetDocRef<{ docTag: AnyDoc; isStrong: false }> {
		// $assert(this.context)
		return new CustomDocRef(this._context, concatPath(pathTokens), {
			isStrong: false,
		}) as never
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
		) as never
	}
}
