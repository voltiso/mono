// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { WithDb } from '~/Db'
import type { WithDocRef } from '~/DocRef'
import type { WithTransaction } from '~/Transaction'
import type { WithTransactor } from '~/Transactor'
import type { Forbidden } from '~/util'

export type DocRefBaseContext = WithTransactor &
	Partial<WithTransaction> &
	WithDb
export type DocRefParentContext = DocRefBaseContext & Forbidden<WithDocRef>
export type DocRefContext = DocRefBaseContext & WithDocRef

export type DocRefContextWithTransaction = WithTransactor &
	WithTransaction &
	WithDocRef &
	WithDb
