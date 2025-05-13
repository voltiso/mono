// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isPlainObject } from '@voltiso/util'

import type { StrongDocRefJson, WeakDocRefJson } from '~/common'
import { isStrongDocRefJson, isWeakDocRefJson } from '~/common'
import type { DocRef, WeakDocRef } from '~/DocRef'
import type { Transactor } from '~/Transactor'

import type { DateJson } from '../date'
import { dateFromJson, isDateJson } from '../date'

export type DocDataFromJson<J> = J extends StrongDocRefJson
	? DocRef
	: J extends WeakDocRefJson
		? WeakDocRef
		: J extends DateJson
			? Date
			: J extends object
				? { [k in keyof J]: DocDataFromJson<J[k]> }
				: J

export function docDataFromJson<J>(
	db: Transactor,
	json: J,
): DocDataFromJson<J> {
	if (isStrongDocRefJson(json)) {
		const ref = db.doc(json.path)
		return ref.asStrongRef as never
	}

	if (isWeakDocRefJson(json)) return db.doc(json.path).asWeakRef as never

	if (isDateJson(json)) return dateFromJson(json) as never

	if (isPlainObject(json))
		return Object.fromEntries(
			Object.entries(json).map(([key, value]) => [
				key,
				docDataFromJson(db, value),
			]),
		) as never

	return json as never
}
