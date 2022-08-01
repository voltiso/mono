// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { WithDb } from '~/Db/index'
import type { WithDocRef } from '~/Ref/index'
import type { WithTransaction } from '~/Transaction/index'
import type { WithTransactor } from '~/Transactor/index'

export type DocContext = Partial<WithTransaction> &
	WithDocRef &
	WithDb &
	WithTransactor
