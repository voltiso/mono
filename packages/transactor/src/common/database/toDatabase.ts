// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import type * as FirestoreLike from '@voltiso/firestore-like'
import { getKeys, isPlain, undef } from '@voltiso/util'

import type { DataWithoutId, NestedData } from '../../Data/Data.js'
import type { DatabaseContext } from '../../DatabaseContext.js'
import { isDeleteIt, isIncrementIt, isReplaceIt } from '../../it'
import { isDocRef } from '../../Ref'
import type {
	NestedUpdates,
	Updates,
	UpdatesRecord,
} from '../../updates/Updates.js'

export function toDatabaseUpdate(
	ctx: DatabaseContext,
	updates: UpdatesRecord,
): FirestoreLike.UpdateData
export function toDatabaseUpdate(
	ctx: DatabaseContext,
	nestedUpdates: NestedUpdates,
): FirestoreLike.UpdateDataNested

// eslint-disable-next-line sonarjs/cognitive-complexity
export function toDatabaseUpdate(
	ctx: DatabaseContext,
	updates: Updates | NestedUpdates,
): FirestoreLike.UpdateData | FirestoreLike.UpdateDataNested {
	if (isDocRef(updates)) return ctx.database.doc(updates.path.pathString)

	if (updates instanceof Date) return updates

	if (isIncrementIt(updates)) return ctx.module.FieldValue.increment(updates.n)

	if (isReplaceIt(updates))
		throw new Error('firestore does not support ReplaceField')

	if (isDeleteIt(updates)) return ctx.module.FieldValue.delete()

	if (isPlain(updates)) {
		const r: FirestoreLike.UpdateData = {}

		for (const [key, val] of Object.entries(updates)) {
			const rr = toDatabaseUpdate(ctx, val as never)

			// if (Database.isTimestamp(rr)) r[key] = rr
			if (isPlain(rr))
				for (const childKey of getKeys(rr)) {
					// eslint-disable-next-line security/detect-object-injection
					const val = (rr as FirestoreLike.DocumentData)[childKey]
					assert(val !== undef)
					r[`${key}.${childKey}`] = val
				}
			// eslint-disable-next-line security/detect-object-injection
			else r[key] = rr
		}

		return r
	} else return updates
}

export function toDatabaseSet(
	ctx: DatabaseContext,
	obj: DataWithoutId,
): FirestoreLike.DocumentData
export function toDatabaseSet(
	ctx: DatabaseContext,
	obj: NestedData,
): FirestoreLike.DocumentDataNested

export function toDatabaseSet(
	ctx: DatabaseContext,
	obj: DataWithoutId | NestedData,
): FirestoreLike.DocumentData | FirestoreLike.DocumentDataNested {
	if (isDocRef(obj)) return ctx.database.doc(obj.path.pathString)

	if (obj instanceof Date) return ctx.module.Timestamp.fromDate(obj)

	if (isReplaceIt(obj)) return toDatabaseSet(ctx, obj.data as NestedData)

	if (isIncrementIt(obj))
		throw new Error(
			'firestoreSet: incrementField() sentinel not allowed - are you trying to update non-existing document?',
		)

	assert(!isDeleteIt(obj))

	if (isPlain(obj)) {
		const r: FirestoreLike.DocumentData = {}

		for (const [key, val] of Object.entries(obj)) {
			if (isDeleteIt(val)) continue

			// eslint-disable-next-line security/detect-object-injection
			r[key] = toDatabaseSet(ctx, val as never)
		}

		return r
	}

	return obj
}
