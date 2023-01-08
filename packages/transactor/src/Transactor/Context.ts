// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { WithDb } from '~/Db'
import type { DbContext } from '~/Db/Context'
import type { WithTransaction } from '~/Transaction'
import type { Forbidden } from '~/util'

import type { WithTransactor } from './WithTransactor'

export type TransactorContext = DbContext &
	WithTransactor &
	Forbidden<WithTransaction>

export type ContextOverride = WithTransaction & WithDb
