// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import type * as FirestoreLike from '@voltiso/firestore-like'
import {
	getKeys,
	isArraySetUpdateIt,
	isDeleteIt,
	isIncrementIt,
	isPlainObject,
	isReplaceIt,
} from '@voltiso/util'

import type { NestedData } from '~/Data/Data'
import type { DatabaseContext } from '~/DatabaseContext'
import { TransactorError } from '~/error'
import type { IntrinsicFields } from '~/schemas'
import type { NestedUpdates, Updates, UpdatesRecord } from '~/updates/Updates'

interface WithToDatabase {
	toDatabase: () => NestedData
}

function isWithToDatabase(x: unknown): x is WithToDatabase {
	return typeof (x as WithToDatabase | null)?.toDatabase === 'function'
}

export function toDatabaseUpdate(
	ctx: DatabaseContext,
	updates: UpdatesRecord,
): FirestoreLike.UpdateData
export function toDatabaseUpdate(
	ctx: DatabaseContext,
	nestedUpdates: NestedUpdates,
): FirestoreLike.UpdateDataNested

export function toDatabaseUpdate(
	ctx: DatabaseContext,
	updates: Updates | NestedUpdates,
): FirestoreLike.UpdateData | FirestoreLike.UpdateDataNested {
	if (updates instanceof Date) return updates

	if (isWithToDatabase(updates)) return updates.toDatabase()

	if (isIncrementIt(updates)) {
		assert(typeof updates.__incrementIt === 'number')
		return ctx.module.FieldValue.increment(updates.__incrementIt)
	}

	if (isArraySetUpdateIt(updates)) {
		if (
			updates.__arraySetUpdateIt.add?.length &&
			updates.__arraySetUpdateIt.remove?.length
		) {
			throw new TransactorError(
				'Mixing array add and array remove operations is not supported',
			)
		}

		if (updates.__arraySetUpdateIt.add?.length)
			return ctx.module.FieldValue.arrayUnion(...updates.__arraySetUpdateIt.add)

		if (updates.__arraySetUpdateIt.remove?.length)
			return ctx.module.FieldValue.arrayRemove(
				...updates.__arraySetUpdateIt.remove,
			)
	}

	if (isReplaceIt(updates))
		throw new TransactorError('firestore does not support ReplaceField')

	if (isDeleteIt(updates)) return ctx.module.FieldValue.delete()

	// if (Array.isArray(updates)) {
	// 	return updates.map(x => toDatabaseUpdate(ctx, x)) as never
	// }

	if (isPlainObject(updates)) {
		const r: FirestoreLike.UpdateData = {}

		for (const [key, val] of Object.entries(updates)) {
			const rr = toDatabaseUpdate(ctx, val as never)

			// if (Database.isTimestamp(rr)) r[key] = rr
			if (isPlainObject(rr))
				for (const childKey of getKeys(rr)) {
					// eslint-disable-next-line security/detect-object-injection
					const val = (rr as FirestoreLike.DocumentData)[childKey]
					assert(val !== undefined)
					r[`${key}.${childKey}`] = val
				}
			// eslint-disable-next-line security/detect-object-injection
			else r[key] = rr
		}

		return r
	} else return updates
}

//

export function toDatabaseSetNested(
	ctx: DatabaseContext,
	obj: NestedData,
): FirestoreLike.DocumentData | FirestoreLike.DocumentDataNested {
	/* Date should be auto-converted to Timestamp */
	if (obj instanceof Date) return obj // return ctx.module.Timestamp.fromDate(obj)

	if (isWithToDatabase(obj)) return obj.toDatabase() as never
	// if (isStrongDocRef(obj)) return ctx.database.doc(obj.path.pathString)

	if (isReplaceIt(obj))
		return toDatabaseSetNested(ctx, obj.__replaceIt as NestedData)

	if (isIncrementIt(obj))
		throw new TransactorError(
			'firestoreSet: incrementField() sentinel not allowed - are you trying to update non-existing document?',
		)

	assert(!isDeleteIt(obj))
	assert(!isArraySetUpdateIt(obj))

	if (Array.isArray(obj)) {
		return obj.map(x => toDatabaseSetNested(ctx, x)) as never
	}

	if (isPlainObject(obj)) {
		const r: FirestoreLike.DocumentData = {}

		for (const [key, val] of Object.entries(obj)) {
			if (isDeleteIt(val)) continue

			// eslint-disable-next-line security/detect-object-injection
			r[key] = toDatabaseSetNested(ctx, val as never)
		}

		return r
	}

	return obj
}

export function toDatabaseSet(
	ctx: DatabaseContext,
	obj: IntrinsicFields,
): FirestoreLike.DocumentData {
	if (isReplaceIt(obj))
		return toDatabaseSet(ctx, obj.__replaceIt as IntrinsicFields)

	assert(isPlainObject(obj))

	assert(!isDeleteIt(obj))
	assert(!isArraySetUpdateIt(obj))

	const finalObj = obj as Partial<IntrinsicFields>

	// if (deepEqual(finalObj.__voltiso, sVoltisoEntry.validate(undefined))) {
	// 	finalObj = omitVoltisoEntry(obj)
	// }

	const r: FirestoreLike.DocumentData = {}

	for (const [key, val] of Object.entries(finalObj)) {
		if (isDeleteIt(val)) continue

		// eslint-disable-next-line security/detect-object-injection
		r[key] = toDatabaseSetNested(ctx, val as never)
	}

	return r
}
