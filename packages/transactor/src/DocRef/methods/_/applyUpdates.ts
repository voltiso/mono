// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isDeleteIt, patch } from '@voltiso/util'

import { TransactorError } from '~/error'

export function applyUpdates(data: unknown, updates: unknown): unknown {
	if (isDeleteIt(updates)) return null

	if (data === null) throw new TransactorError('NOT_FOUND')

	return patch(data, updates as never)
}
