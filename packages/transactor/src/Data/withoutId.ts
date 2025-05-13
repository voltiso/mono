// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { omitIfPresent } from '@voltiso/util'

import type { DocIdString } from '~/brand'
import { TransactorError } from '~/error'

export function withoutId(data: null, expectedId: DocIdString): null
export function withoutId<D extends object>(
	data: D,
	expectedId: DocIdString,
): Omit<D, 'id'>
export function withoutId<D extends object | null>(
	data: D,
	expectedId: DocIdString,
): D extends null ? null : Omit<D, 'id'>

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function withoutId(
	data: { id?: string } | null,
	expectedId: DocIdString,
) {
	if (data === null) return null

	// expectedId is mandatory so that we don't ever forget
	if (data.id && expectedId !== data.id)
		throw new TransactorError(
			`'id' field mismatch: expected ${expectedId}, got ${data.id}`,
		)

	// if ((data as any)?.id) console.log('omitting id field', new Error('here'))

	return omitIfPresent(data, 'id')
}
