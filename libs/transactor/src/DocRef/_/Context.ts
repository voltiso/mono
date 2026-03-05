// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { WithDb } from '~/Db'
import type { WithDocRef } from '~/DocRef'
import type { WithTransaction } from '~/Transaction'
import type { WithTransactor } from '~/Transactor'
import type { Forbidden } from '~/util'

export interface DocRefContext extends DocRefContext.Base, WithDocRef {}

export namespace DocRefContext {
	export type Base = WithTransactor & Partial<WithTransaction> & WithDb

	export type Parent = Base & Forbidden<WithDocRef>

	export type AlsoWithTransaction = WithTransactor &
		WithTransaction &
		WithDocRef &
		WithDb
}
