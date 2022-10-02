// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import * as Database from '@voltiso/firestore-like'
import { isPlainObject } from '@voltiso/util'

import type { DataRecord, NestedData, NestedDataNoArray } from '~/Data/Data'
import { isDocRef, StrongDocRef, WeakDocRef } from '~/Ref'
import type { DocRefBaseContext } from '~/Ref/_/Context'
import type { IntrinsicFields } from '~/schemas'

import { isRefEntry } from './RefEntry'

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
	} else if (isRefEntry(o)) {
		// console.log('fromDatabase ref', o.__target, o.__isStrong)

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
	ctx: DocRefBaseContext,
	doc: Database.DocumentSnapshot | Database.QueryDocumentSnapshot,
): IntrinsicFields | null => {
	const data = doc.data()

	if (!data) return null
	else {
		const fixed = fromDatabaseData(ctx, data)
		$assert(isPlainObject(fixed))
		return fixed as IntrinsicFields
	}
}
