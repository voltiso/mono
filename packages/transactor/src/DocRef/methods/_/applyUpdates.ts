// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ApplyPatch, PatchFor } from '@voltiso/util'
import { isDeleteIt, isReplaceIt, patch } from '@voltiso/util'

import { TransactorError } from '~/error'

export function applyUpdates<X, Updates extends PatchFor<X>>(
	data: X,
	updates: Updates,
): ApplyPatch<X, Updates> | null {
	// console.log('applyUpdates', { data, updates })

	if (isDeleteIt(updates) || (isReplaceIt(updates) && !updates.__replaceIt))
		return null

	if (data === null && !isReplaceIt(updates))
		throw new TransactorError('NOT_FOUND')

	return patch(data, updates as never)
}
