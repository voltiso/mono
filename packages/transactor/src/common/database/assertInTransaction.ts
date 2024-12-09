// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { TransactorError } from '~/error/TransactorError'
import type { WithTransactor } from '~/Transactor/WithTransactor'

//

export function assertInTransaction(ctx: WithTransactor): void {
	const isInTransaction = !!ctx.transactor._getTransactionContext()

	if (!isInTransaction) {
		throw new TransactorError(
			'Illegal Database operation: expected to be in transaction',
		)
	}
}

//

export function assertNotInTransaction(ctx: WithTransactor): void {
	const isInTransaction = !!ctx.transactor._getTransactionContext()

	if (isInTransaction) {
		throw new TransactorError(
			'Illegal Database operation: expected NOT to be in transaction',
		)
	}
}
