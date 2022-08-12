// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IDocTI } from '~/Doc'
import type { DocFieldPath } from '~/Ref/DocFieldPath'

import type { GetData } from './GData'

export type GDocFields<TI extends IDocTI> = {
	[k in keyof GetData<TI>]: DocFieldPath<GetData<TI>[k]>
}
