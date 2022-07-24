// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { WithDb } from '../Db'
import type { WithDocRef } from '../Ref'
import type { WithTransaction } from '../Transaction'
import type { WithTransactor } from '../Transactor'

export type Context = Partial<WithTransaction> &
	WithDocRef &
	WithDb &
	WithTransactor
