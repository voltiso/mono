// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import * as Database from '@voltiso/firestore-like'
import { isPlainObject, stringFrom } from '@voltiso/util'

import { isWithId } from '~/Data'
import type { DataRecord, NestedData, NestedDataNoArray } from '~/Data/Data'
import type { DocRefBaseContext, WithDocRef } from '~/DocRef'
import { isDocRef, StrongDocRef, WeakDocRef } from '~/DocRef'
import { TransactorError } from '~/error'
import type { IntrinsicFields } from '~/schemas'

import { isDocRefDatabase, isDocRefJson } from './RefEntry'

export function fromDatabaseData(
	ctx: DocRefBaseContext,
	o: Database.DocumentDataNestedNoArray,
): NestedDataNoArray

export function fromDatabaseData(
	ctx: DocRefBaseContext,
	o: Database.DocumentDataNested,
): NestedDataNoArray

export function fromDatabaseData(
	ctx: DocRefBaseContext,
	o: Database.DocumentDataNested,
): NestedData {
	if (Array.isArray(o)) {
		return o.map(x => fromDatabaseData(ctx, x))
		// } else if (isRefLike(o)) {
		// 	return new Ref(o.__ref) as unknown as T
	} else if (isDocRef(o)) {
		return o
	} else if (Database.isDocumentReference(o)) {
		// eslint-disable-next-line no-console
		console.warn('found LEGACY STRONG REF', o.path)
		return new StrongDocRef(ctx, o.path)
	} else if (isDocRefJson(o)) {
		// console.log('fromDatabase ref', o.__target, o.__isStrong)

		if (o.__isStrong) return new StrongDocRef(ctx, o.__target)
		else return new WeakDocRef(ctx, o.__target)
	} else if (isDocRefDatabase(o)) {
		if (o.__isStrong) return new StrongDocRef(ctx, o.__target.path)
		else return new WeakDocRef(ctx, o.__target.path)
	} else if (Database.isTimestamp(o)) return o.toDate()
	else if (isPlainObject(o)) {
		const r: DataRecord = {}

		for (const [key, val] of Object.entries(o)) {
			// eslint-disable-next-line security/detect-object-injection
			r[key] = fromDatabaseData(ctx, val as never)
		}

		return r
	} else return o
}

//

export const fromDatabase = (
	ctx: DocRefBaseContext & Partial<WithDocRef>,
	doc: Database.DocumentSnapshot | Database.QueryDocumentSnapshot,
): IntrinsicFields | null => {
	const data = doc.data()

	if (!data) return null

	if (isWithId(data)) {
		let message = `id: ${stringFrom(
			data.id,
		)} field encountered in raw database data`

		if (ctx.docRef) message += ` for document ${ctx.docRef.path.toString()}`

		const { allowIdField, allowValidIdField } = ctx.transactor._options

		if (!allowIdField && !allowValidIdField) throw new TransactorError(message)
		// eslint-disable-next-line no-console
		else if (allowIdField === 'warn') console.warn(message)

		const isValid = data.id === ctx.docRef?.id
		if (!isValid) {
			const invalidMessage = `invalid ${message}`
			if (!allowValidIdField) throw new TransactorError(invalidMessage)
			// eslint-disable-next-line no-console
			else if (allowValidIdField === 'warn') console.warn(invalidMessage)
		}
	}

	const fixed = fromDatabaseData(ctx, data)
	$assert(isPlainObject(fixed))
	return fixed as IntrinsicFields
}
