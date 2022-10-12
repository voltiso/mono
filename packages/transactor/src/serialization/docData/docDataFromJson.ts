// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isPlainObject } from '@voltiso/util'

import type { StrongDocRefJson, WeakDocRefJson } from '~/common'
import { isStrongDocRefJson, isWeakDocRefJson } from '~/common'
import type { StrongDocRef, WeakDocRef } from '~/DocRef'
import type { Transactor } from '~/Transactor'

import { dateFromJson, isDateJson } from '../date'

export type DocDataFromJson<J> = J extends StrongDocRefJson
	? StrongDocRef
	: J extends WeakDocRefJson
	? WeakDocRef
	: J extends object
	? { [k in keyof J]: DocDataFromJson<J[k]> }
	: never

export function docDataFromJson<J>(
	db: Transactor,
	json: J,
): DocDataFromJson<J> {
	if (isStrongDocRefJson(json))
		return db.doc(json.__target).asStrongRef as never

	if (isWeakDocRefJson(json)) return db.doc(json.__target).asWeakRef as never

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
