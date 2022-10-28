// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$DocTI } from '~/Doc'
import type { DocFieldPath } from '~/DocRef'

import type { GetData } from './GData'

/** @inline */
export type GDocFields<TI extends $$DocTI> = {
	[k in keyof GetData<TI>]: DocFieldPath<GetData<TI>[k]>
}

/** @inline */
export type GDocFields_<TI> = [TI] extends [$$DocTI] ? GDocFields<TI> : never
