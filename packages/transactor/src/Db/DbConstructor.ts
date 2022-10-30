// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OmitCall } from '@voltiso/util'

import type { DbParentContext } from './Context'
import type { Db } from './Db'

export interface DbConstructor<Derived extends OmitCall<Db> = Db> {
	new (parentContext: DbParentContext): Derived
}
