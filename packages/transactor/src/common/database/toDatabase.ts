// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import type * as FirestoreLike from '@voltiso/firestore-like'
import type { Json } from '@voltiso/util'
import { getKeys, isPlainObject, undef } from '@voltiso/util'

import type { IntrinsicFields } from '~'
import type { NestedData } from '~/Data/Data'
import type { DatabaseContext } from '~/DatabaseContext'
import { isDeleteIt, isIncrementIt, isReplaceIt } from '~/it'
import type { NestedUpdates, Updates, UpdatesRecord } from '~/updates/Updates'

interface WithToJSON {
	toJSON: () => Json
}

function isWithToJSON(x: unknown): x is WithToJSON {
	return typeof (x as WithToJSON | null)?.toJSON === 'function'
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

	if (isWithToJSON(updates)) return updates.toJSON()

	if (isIncrementIt(updates)) return ctx.module.FieldValue.increment(updates.n)

	if (isReplaceIt(updates))
		throw new Error('firestore does not support ReplaceField')

	if (isDeleteIt(updates)) return ctx.module.FieldValue.delete()

	if (isPlainObject(updates)) {
		const r: FirestoreLike.UpdateData = {}

		for (const [key, val] of Object.entries(updates)) {
			const rr = toDatabaseUpdate(ctx, val as never)

			// if (Database.isTimestamp(rr)) r[key] = rr
			if (isPlainObject(rr))
				for (const childKey of getKeys(rr)) {
					// eslint-disable-next-line security/detect-object-injection
					const val = (rr as FirestoreLike.DocumentData)[childKey]
					$assert(val !== undef)
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
	obj: IntrinsicFields,
): FirestoreLike.DocumentData
export function toDatabaseSet(
	ctx: DatabaseContext,
	obj: NestedData,
): FirestoreLike.DocumentDataNested

export function toDatabaseSet(
	ctx: DatabaseContext,
	obj: IntrinsicFields | NestedData,
): FirestoreLike.DocumentData | FirestoreLike.DocumentDataNested {
	if (obj instanceof Date) return ctx.module.Timestamp.fromDate(obj)

	if (isWithToJSON(obj)) return obj.toJSON() as never
	// if (isStrongDocRef(obj)) return ctx.database.doc(obj.path.pathString)

	if (isReplaceIt(obj)) return toDatabaseSet(ctx, obj.data as NestedData)

	if (isIncrementIt(obj))
		throw new Error(
			'firestoreSet: incrementField() sentinel not allowed - are you trying to update non-existing document?',
		)

	$assert(!isDeleteIt(obj))

	if (isPlainObject(obj)) {
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
