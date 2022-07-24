// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Db_ } from './Db_.js'
import type { DbConstructor } from './DbConstructor.js'

export type Db = Db_
export const Db = Db_ as unknown as DbConstructor<Db>
