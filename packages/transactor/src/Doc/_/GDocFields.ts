// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocFieldPath } from '../../Ref/DocFieldPath.js'
import type { IDocTI } from '../DocTI.js'
import type { GData } from './GData.js'

export type GDocFields<TI extends IDocTI> = {
	[k in keyof GData<TI>]: DocFieldPath<GData<TI>[k]>
}
