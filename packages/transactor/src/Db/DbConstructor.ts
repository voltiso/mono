// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OmitCall } from '@voltiso/util'

import type { ParentContext } from './Context.js'
import type { Db } from './Db.type'

export interface DbConstructor<Derived extends OmitCall<Db> = Db> {
	new (parentContext: ParentContext): Derived
}
