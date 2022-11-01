// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$DocRelated } from '~/Doc'
import type { DocFieldPath } from '~/DocFieldPath'

import type { GetData } from './GData'

/** @inline */
export type GetDocFields<R extends $$DocRelated> = {
	[k in keyof GetData<R>]: DocFieldPath<GetData<R>[k]>
}
