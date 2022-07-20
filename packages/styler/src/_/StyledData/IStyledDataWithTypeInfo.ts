// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Props } from '../../react-types'
import type { IStyledData } from './IStyledData.js'

export interface IStyledDataWithTypeInfo<P extends Props = Props>
	extends IStyledData {
	/** Type-only (no value at runtime) */
	P: P
}
