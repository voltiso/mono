// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Db_ } from './Db_'
import type { DbConstructor } from './DbConstructor'

export type Db = Db_
export const Db = Db_ as unknown as DbConstructor<Db>
