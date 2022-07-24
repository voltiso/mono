// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { WithTransaction } from '../Transaction'
import type { WithTransactor } from '../Transactor'
import type { Forbidden } from '../util'
import type { WithDb } from './WithDb'

type BaseContext = WithTransactor & Partial<WithTransaction>
export type ParentContext = BaseContext & Forbidden<WithDb>
export type DbContext = BaseContext & WithDb
