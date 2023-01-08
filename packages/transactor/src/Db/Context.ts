// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { WithTransaction } from '~/Transaction'
import type { WithTransactor } from '~/Transactor'
import type { Forbidden } from '~/util'

import type { WithDb } from './WithDb'

type BaseDbContext = WithTransactor & Partial<WithTransaction>
export type DbParentContext = BaseDbContext & Forbidden<WithDb>
export type DbContext = BaseDbContext & WithDb
