// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isDefined } from '@voltiso/util'

import type { DataRecord } from '~/Data'
import type { IntrinsicFields } from '~/schemas'
import type { Updates } from '~/updates'
import { applyUpdates } from '~/updates'

import type { DocRefContext } from './Context'

/**
 * (pure) Apply our updates to a given data - this may be called several times
 * for beforeTriggers
 *
 * @param ctx - Context
 * @param data - Data without id
 * @returns Updated data
 */
export function apply(
	ctx: DocRefContext.ContextWithTransaction,
	data: DataRecord | null,
	updates?: Updates,
): IntrinsicFields | DataRecord | null {
	return isDefined(updates)
		? applyUpdates(data, updates, { path: ctx.docRef.path.toString() })
		: data
}
