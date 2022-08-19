// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocTILike } from '~/Doc'
import type { DocFieldPath } from '~/Ref/DocFieldPath'

import type { GetData } from './GData'

/** @inline */
export type GDocFields<TI extends DocTILike> = {
	[k in keyof GetData<TI>]: DocFieldPath<GetData<TI>[k]>
}
