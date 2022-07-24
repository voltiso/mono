// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import type * as Database from '@voltiso/firestore-like'
import { isPlain } from '@voltiso/util'

import type {
	DataRecord,
	DataWithoutId,
	NestedData,
	NestedDataNoArray,
} from '../../Data/Data.js'
import { DocRef, WeakDocRef } from '../../Ref'
import type { DocRefBaseContext } from '../../Ref/_'
import { isTimestamp } from '../../util'
import { isRefEntry } from './RefEntry.js'

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
	} else if (isRefEntry(o)) {
		if (o.__isStrong) return new DocRef(ctx, o.__target.path)
		else return new WeakDocRef(ctx, o.__target.path)
	} else if (isTimestamp(o)) return o.toDate()
	else if (isPlain(o)) {
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
): DataWithoutId | null => {
	const data = doc.data()

	if (!data) return null
	else {
		const fixed = fromFirestoreRec(ctx, data)
		assert(isPlain(fixed))
		return fixed as DataWithoutId
	}
}
