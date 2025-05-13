// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { WithDb } from '~/Db'
import type { WithDocRef } from '~/DocRef'
import type { WithTransaction } from '~/Transaction'
import type { WithTransactor } from '~/Transactor'

export type DocContext = Partial<WithTransaction> &
	WithDocRef &
	WithDb &
	WithTransactor
