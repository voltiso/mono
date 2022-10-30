// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isDocumentReference, isTimestamp } from '@voltiso/firestore-like'
import { isDate, isPlainObject } from '@voltiso/util'

import type { StrongDocRefJson, WeakDocRefJson } from '~/common'
import type { $$DocRef } from '~/DocRef'
import { isDocRef } from '~/DocRef'

import type { DateJson } from '../date'

export type JsonFromDocData<Data> = Data extends $$DocRef & {
	readonly isStrong: boolean
}
	? Data['isStrong'] extends true
		? StrongDocRefJson
		: WeakDocRefJson
	: Data extends string
	? string
	: Data extends Date
	? DateJson
	: Data extends object
	? {
			[k in keyof Data]: JsonFromDocData<Data[k]>
	  }
	: Data

export function jsonFromDocData<Data>(data: Data): JsonFromDocData<Data> {
	if (isDocRef(data)) return data.toJSON() as never

	if (isDocumentReference(data)) return { __target: data.path } as never

	if (isDate(data)) return { __date: data.toISOString() } as never

	if (isTimestamp(data)) return { __date: data.toDate().toISOString() } as never

	if (Array.isArray(data))
		return (data as unknown[]).map(item => jsonFromDocData(item)) as never

	if (isPlainObject(data))
		return Object.fromEntries(
			Object.entries(data).map(([key, value]) => [key, jsonFromDocData(value)]),
		) as never

	return data as never
}
