// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import * as Database from '@voltiso/firestore-like'
import { isPlainObject } from '@voltiso/util'

import type { IntrinsicFields } from '~'
import type { DataRecord, NestedData, NestedDataNoArray } from '~/Data/Data'
import { StrongDocRef, WeakDocRef } from '~/Ref'
import type { DocRefBaseContext } from '~/Ref/_/Context'
import { isTimestamp } from '~/util'

import { isRefEntry } from './RefEntry'

function fromFirestoreRec(
	ctx: DocRefBaseContext,
	o: Database.DocumentDataNestedNoArray,
): NestedDataNoArray
function fromFirestoreRec(
	ctx: DocRefBaseContext,
	o: Database.DocumentDataNested,
): NestedDataNoArray

function fromFirestoreRec(
	ctx: DocRefBaseContext,
	o: Database.DocumentDataNested,
): NestedData {
	if (Array.isArray(o)) {
		return o.map(x => fromFirestoreRec(ctx, x))
		// } else if (isRefLike(o)) {
		// 	return new Ref(o.__ref) as unknown as T
	} else if (Database.isDocumentReference(o)) {
		// eslint-disable-next-line no-console
		console.warn('found LEGACY STRONG REF', o.path)
		return new StrongDocRef(ctx, o.path)
	} else if (isRefEntry(o)) {
		// console.log('fromDatabase ref', o.__target, o.__isStrong)

		if (o.__isStrong) return new StrongDocRef(ctx, o.__target.path)
		else return new WeakDocRef(ctx, o.__target.path)
	} else if (isTimestamp(o)) return o.toDate()
	else if (isPlainObject(o)) {
		const r: DataRecord = {}

		for (const [key, val] of Object.entries(o)) {
			// eslint-disable-next-line security/detect-object-injection
			r[key] = fromFirestoreRec(ctx, val as never)
		}

		return r
	} else return o
}

export const fromFirestore = (
	ctx: DocRefBaseContext,
	doc: Database.DocumentSnapshot,
): IntrinsicFields | null => {
	const data = doc.data()

	if (!data) return null
	else {
		const fixed = fromFirestoreRec(ctx, data)
		$assert(isPlainObject(fixed))
		return fixed as IntrinsicFields
	}
}
