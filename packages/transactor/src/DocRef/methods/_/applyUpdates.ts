// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ApplyPatch, PatchFor } from '@voltiso/util'
import { isDeleteIt, isReplaceIt, patch } from '@voltiso/util'

import { TransactorError } from '~/error'

export function applyUpdates<
	X extends object | null | undefined,
	Updates extends PatchFor<X>,
>(data: X, updates: Updates): ApplyPatch<X, Updates> | null {
	// console.log('applyUpdates', { data, updates })

	if (isDeleteIt(updates) || (isReplaceIt(updates) && !updates.__replaceIt))
		return null

	if (data === null && !isReplaceIt(updates))
		throw new TransactorError('NOT_FOUND')

	const result = patch(data, updates as never)

	if (result === data || !result || !data) return result

	if ('__voltiso' in data)
		return {
			...(result as object),

			__voltiso: (data as any).__voltiso,
		} as never

	return result
}
