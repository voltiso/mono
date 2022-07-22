// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ISchema } from '../../schema'
import type { VoidOptions } from './_/VoidOptions.js'
import type { IS_VOID } from './isVoid.js'

export interface IVoid<O extends VoidOptions = VoidOptions> extends ISchema<O> {
	readonly [IS_VOID]: true
}
