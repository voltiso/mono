// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { NoContextError } from '@voltiso/context'

import { TransactorError } from '~/error/TransactorError'
import type { WithTransactor } from '~/Transactor/WithTransactor'

//

export function assertInTransaction(ctx: WithTransactor): void {
	try {
		// eslint-disable-next-line sonarjs/void-use
		void ctx.transactor._transactionContext.value
	} catch (error) {
		const outerError = new TransactorError(
			'Illegal Database operation: expected to be in transaction',
			{ cause: error },
		)
		throw outerError
	}

	// if (!ctxOverride)
	// 	throw new TransactorError(
	// 		'Illegal Database operation: expected to be in transaction',
	// 	)
}

//

export function assertNotInTransaction(ctx: WithTransactor): void {
	try {
		// eslint-disable-next-line sonarjs/void-use
		void ctx.transactor._transactionContext.value
	} catch (error) {
		if (error instanceof NoContextError) return
	}

	// const ctxOverride = ctx.transactor._transactionContext.value
	// const ctxOverride = Zone.current.get('transactionContextOverride') as unknown

	// if (ctxOverride)
	throw new TransactorError(
		'Illegal Database operation: expected to NOT be in transaction',
	)
}
