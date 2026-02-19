// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
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
	nestedData: Database.DocumentDataNestedNoArray,
): NestedDataNoArray

export function fromDatabaseData(
	ctx: DocRefContext.Base,
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	nestedData: Database.DocumentDataNested,
): NestedDataNoArray

// eslint-disable-next-line sonarjs/function-return-type, sonarjs/cyclomatic-complexity
export function fromDatabaseData(
	ctx: DocRefContext.Base,
	nestedData: Database.DocumentDataNested,
): NestedData {
	if (Array.isArray(nestedData)) {
		return nestedData.map(x => fromDatabaseData(ctx, x))
		// } else if (isRefLike(o)) {
		// 	return new Ref(o.__ref) as unknown as T
	} else if (isDocRef(nestedData)) {
		return nestedData as never
	} else if (Database.isDocumentReference(nestedData)) {
		// eslint-disable-next-line no-console
		console.warn('found LEGACY STRONG REF', nestedData.path)
		return new CustomDocRef(ctx, nestedData.path, { isStrong: true })
	} else if (isDocRefJson(nestedData)) {
		// console.log('fromDatabase ref', o.__target, o.__isStrong)

		if (nestedData.isStrong)
			return new CustomDocRef(ctx, nestedData.path, { isStrong: true })
		else return new CustomDocRef(ctx, nestedData.path, { isStrong: false })
	} else if (isDocRefDatabase(nestedData)) {
		if (nestedData.isStrong)
			return new CustomDocRef(ctx, nestedData.ref.path, { isStrong: true })
		else return new CustomDocRef(ctx, nestedData.ref.path, { isStrong: false })
	} else if (Database.isTimestamp(nestedData)) return nestedData.toDate()
	else if (isPlainObject(nestedData)) {
		const r: DataRecord = {}

		for (const [key, val] of Object.entries(nestedData)) {
			r[key] = fromDatabaseData(ctx, val as never)
		}

		return r
	} else return nestedData as never
}

//

export function fromDatabase(
	ctx: DocRefContext.Base & Partial<WithDocRef>,
	snapshot: Database.DocumentSnapshot | Database.QueryDocumentSnapshot,
): IntrinsicFields | null {
	const data = snapshot.data()

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
