// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { WithDocRef } from '../Ref'
import type { WithTransaction } from './WithTransaction.js'

/**
 * Guards an inline function; keeping tract of execContext and numTriggersNested
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
	} finally {
		ctx.transaction._numTriggersNested = prevNumTriggersNested
		ctx.transaction._execContext = prevExecContext
	}
}

/**
 * Guards an inline function; keeping tract of execContext and numMethodsNested
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
	} finally {
		ctx.transaction._numMethodsNested = prevNumMethodsNested
		ctx.transaction._execContext = prevExecContext
	}
}
