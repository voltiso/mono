// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { TypeTag } from '../type'

export interface StaticError {
	[TypeTag]: 'StaticError'
}

export type Throw<message> = StaticError & message

// type X = Throw<'sdf' & { a: 1 }>
