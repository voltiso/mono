// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocFieldPath } from '../../Ref/DocFieldPath'
import type { IDocTI } from '../DocTI'
import type { GData } from './GData'

export type GDocFields<TI extends IDocTI> = {
	[k in keyof GData<TI>]: DocFieldPath<GData<TI>[k]>
}
