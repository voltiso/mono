// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert, getKeys, stringFrom } from '@voltiso/util'

import type { NestedData } from '~/Data/Data'
import { TransactorError } from '~/error'
import type { DeleteIt, NestedIt, RootReplaceIt } from '~/it'
import {
	deleteIt,
	incrementIt,
	isDeleteIt,
	isIncrementIt,
	isReplaceIt,
} from '~/it'
import type { IntrinsicFields } from '~/schemas'

export interface UpdatesRecord {
	id?: never
	[k: string]: NestedUpdates
}
export interface NestedUpdatesRecord {
	[k: string]: NestedUpdates
}
export type NestedUpdates = NestedData | NestedUpdatesRecord | NestedIt

export type Updates = UpdatesRecord | RootReplaceIt | DeleteIt

function isRecord(
	updates: NestedUpdates,
): updates is UpdatesRecord | NestedUpdatesRecord {
	return updates?.constructor === Object
}

function combineUpdatesRec(a: NestedUpdates, b: NestedUpdates): NestedUpdates {
	if (isDeleteIt(b)) return b

	if (isReplaceIt(b)) return b.data

	if (isIncrementIt(b)) {
		if (isIncrementIt(a)) return incrementIt(a.n + b.n)
		else if (typeof a === 'number') return a + b.n
		else if (isDeleteIt(a))
			throw new TransactorError(
				`cannot increment field value: undefined += ${b.n}`,
			)
		else
			throw new TransactorError(
				`cannot increment field value: ${stringFrom(a)} += ${b.n}`,
			)
	}

	if (isRecord(a) && isRecord(b)) {
		const r = { ...a }

		for (const field of getKeys(b)) {
			// eslint-disable-next-line security/detect-object-injection
			const bVal = b[field]
			assert(bVal !== undefined)

			// eslint-disable-next-line security/detect-object-injection
			const rField = r[field]
			const originalData = rField === undefined ? deleteIt() : rField
			const data = combineUpdatesRec(originalData, bVal)

			// eslint-disable-next-line security/detect-object-injection
			if (isDeleteIt(data)) delete r[field]
			// eslint-disable-next-line security/detect-object-injection
			else r[field] = data
		}

		return r
	} else return b
}

export function combineUpdates(a: Updates, b: Updates): Updates {
	const r = combineUpdatesRec(a, b)
	assert(r !== null)
	return r as never
}

const dataFromUpdatesRec = (updates: NestedUpdates): NestedData => {
	assert(!isDeleteIt(updates))
	assert(!isIncrementIt(updates))

	if (isReplaceIt(updates)) return updates.data

	if (isRecord(updates)) {
		const r: NestedData = {}

		for (const field of getKeys(updates)) {
			// eslint-disable-next-line security/detect-object-injection
			const updatesVal = updates[field]
			assert(updatesVal !== undefined)

			// eslint-disable-next-line security/detect-object-injection
			if (isDeleteIt(updates[field])) continue

			// eslint-disable-next-line security/detect-object-injection
			r[field] = dataFromUpdatesRec(updatesVal)
		}

		return r
	}

	return updates
}

export const dataFromUpdates = (updates: Updates): IntrinsicFields | null => {
	if (isDeleteIt(updates)) return null

	if (isReplaceIt(updates)) return updates.data as never

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const r = {} as any

	for (const [k, v] of Object.entries(updates)) {
		if (isDeleteIt(v)) continue

		// eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-unsafe-member-access
		r[k] = dataFromUpdatesRec(v)
	}

	return r as never
}

export const applyUpdates = (
	data: Updates | null,
	updates: Updates,
	debug?: { path: string },
): IntrinsicFields | null => {
	if (data === null && !isReplaceIt(updates) && !isDeleteIt(updates)) {
		throw new TransactorError(
			`NOT_FOUND: cannot update non-existing document ${debug?.path || ''}`,
		)
	}

	const combined = data ? combineUpdates(data, updates) : updates
	// if (data && final) $assert(data.id === final.id)
	// if (final) final.id = id
	// $assert(final?.id)
	return dataFromUpdates(combined)
}
