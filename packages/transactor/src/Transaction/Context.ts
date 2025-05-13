// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { WithDb } from '~/Db'
import type { TransactorContext, WithTransactor } from '~/Transactor'

import type { WithTransaction } from './WithTransaction'

export type ParentContext = TransactorContext
export type TransactionContext = WithTransactor & WithTransaction & WithDb
