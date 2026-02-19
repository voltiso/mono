// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { stringFrom } from '@voltiso/util'

import type { WithDocRef } from '~/DocRef'
import { TransactorError } from '~/error'

import type { WithTransaction } from './WithTransaction'

/**
 * Guards an inline function; keeping track of execContext and numTriggersNested
 *
 * @param ctx - Context
 * @param func - Function to guard
 */
export const triggerGuard = async <R>(
	ctx: WithTransaction & WithDocRef,
	func: () => Promise<R>,
): Promise<R> => {
	const prevNumTriggersNested = ctx.transaction._numTriggersNested
	const prevExecContext = ctx.transaction._execContext
	try {
		// eslint-disable-next-line no-plusplus
		ctx.transaction._numTriggersNested++
		ctx.transaction._execContext = ctx.docRef.path
		return await func()
	} catch (error) {
		if (ctx.transaction._error === null)
			ctx.transaction._error =
				error instanceof Error
					? error
					: new TransactorError(`Exotic error: ${stringFrom(error)}`)

		throw error
	} finally {
		// eslint-disable-next-line require-atomic-updates
		ctx.transaction._numTriggersNested = prevNumTriggersNested
		// eslint-disable-next-line require-atomic-updates
		ctx.transaction._execContext = prevExecContext
	}
}

/**
 * Guards an inline function; keeping track of execContext and numMethodsNested
 *
 * @param ctx - Context
 * @param func - Function to guard
 */
export const methodGuard = async <R>(
	ctx: WithTransaction & WithDocRef,
	func: () => Promise<R>,
): Promise<R> => {
	const prevNumMethodsNested = ctx.transaction._numMethodsNested
	const prevExecContext = ctx.transaction._execContext
	try {
		// eslint-disable-next-line no-plusplus
		ctx.transaction._numMethodsNested++
		ctx.transaction._execContext = ctx.docRef.path
		return await func()
	} catch (error) {
		if (ctx.transaction._error === null)
			ctx.transaction._error =
				error instanceof Error
					? error
					: new TransactorError(`Exotic error: ${stringFrom(error)}`)

		throw error
	} finally {
		// eslint-disable-next-line require-atomic-updates
		ctx.transaction._numMethodsNested = prevNumMethodsNested
		// eslint-disable-next-line require-atomic-updates
		ctx.transaction._execContext = prevExecContext
	}
}
