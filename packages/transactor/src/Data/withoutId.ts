// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { omitIfPresent } from '@voltiso/util'

import type { Id } from './Id.js'

export function withoutId(data: null, expectedId: Id): null
export function withoutId<D extends object>(
	data: D,
	expectedId: Id,
): Omit<D, 'id'>
export function withoutId<D extends object | null>(
	data: D,
	expectedId: Id,
): D extends null ? null : Omit<D, 'id'>

export function withoutId(data: { id?: string } | null, expectedId: Id) {
	if (data === null) return null

	// expectedId is mandatory so that we don't ever forget
	if (data.id && expectedId !== data.id)
		throw new Error(
			`'id' field mismatch: expected ${expectedId}, got ${data.id}`,
		)

	return omitIfPresent(data, 'id')
}
