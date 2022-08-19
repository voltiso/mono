// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { GetType } from '@voltiso/schemar'
import * as s from '@voltiso/schemar'

export const sIntrinsicFields = {
	__voltiso: s.object({
		numRefs: s.number,
	}).optional,
}

export type IntrinsicFields = /** @inline */ GetType<typeof sIntrinsicFields>
