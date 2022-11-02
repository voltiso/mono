// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import * as Database from '@voltiso/firestore-like'
import { isPlainObject, stringFrom } from '@voltiso/util'

import { isWithId } from '~/Data'
import type { DataRecord, NestedData, NestedDataNoArray } from '~/Data/Data'
import type { DocRefContext, WithDocRef } from '~/DocRef'
import { CustomDocRef, isDocRef } from '~/DocRef'
import { TransactorError } from '~/error'
import type { IntrinsicFields } from '~/schemas'

import { isDocRefDatabase, isDocRefJson } from './RefEntry'

export function fromDatabaseData(
	ctx: DocRefContext.Base,
	o: Database.DocumentDataNestedNoArray,
): NestedDataNoArray

export function fromDatabaseData(
	ctx: DocRefContext.Base,
	o: Database.DocumentDataNested,
): NestedDataNoArray

export function fromDatabaseData(
	ctx: DocRefContext.Base,
	o: Database.DocumentDataNested,
): NestedData {
	if (Array.isArray(o)) {
		return o.map(x => fromDatabaseData(ctx, x))
		// } else if (isRefLike(o)) {
		// 	return new Ref(o.__ref) as unknown as T
	} else if (isDocRef(o)) {
		return o as never
	} else if (Database.isDocumentReference(o)) {
		// eslint-disable-next-line no-console
		console.warn('found LEGACY STRONG REF', o.path)
		return new CustomDocRef(ctx, o.path, { isStrong: true })
	} else if (isDocRefJson(o)) {
		// console.log('fromDatabase ref', o.__target, o.__isStrong)

		if (o.isStrong) return new CustomDocRef(ctx, o.path, { isStrong: true })
		else return new CustomDocRef(ctx, o.path, { isStrong: false })
	} else if (isDocRefDatabase(o)) {
		if (o.isStrong) return new CustomDocRef(ctx, o.ref.path, { isStrong: true })
		else return new CustomDocRef(ctx, o.ref.path, { isStrong: false })
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
	ctx: DocRefContext.Base & Partial<WithDocRef>,
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

		const isValid = data.id === (ctx.docRef?.id as never)
		if (!isValid) {
			const invalidMessage = `invalid ${message}`
			if (!allowValidIdField) throw new TransactorError(invalidMessage)
			// eslint-disable-next-line no-console
			else if (allowValidIdField === 'warn') console.warn(invalidMessage)
		}
	}

	const fixed = fromDatabaseData(ctx, data)
	assert.plainObject(fixed)
	return fixed as IntrinsicFields
}
