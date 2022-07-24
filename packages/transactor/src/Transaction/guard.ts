// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { WithDocRef } from '../Ref'
import type { WithTransaction } from './WithTransaction'

/**
 * Guards an inline function; keeping tract of execContext and numTriggersNested
 *
 * @param f - Function to guard
 */
export const triggerGuard = async <R>(
	c: WithTransaction & WithDocRef,
	f: () => Promise<R>,
): Promise<R> => {
	const prevNumTriggersNested = c.transaction._numTriggersNested
	const prevExecContext = c.transaction._execContext
	try {
		// eslint-disable-next-line no-plusplus
		c.transaction._numTriggersNested++
		c.transaction._execContext = c.docRef.path
		return await f()
	} finally {
		c.transaction._numTriggersNested = prevNumTriggersNested
		c.transaction._execContext = prevExecContext
	}
}

/**
 * Guards an inline function; keeping tract of execContext and numMethodsNested
 *
 * @param f - Function to guard
 */
export const methodGuard = async <R>(
	c: WithTransaction & WithDocRef,
	f: () => Promise<R>,
): Promise<R> => {
	const prevNumMethodsNested = c.transaction._numMethodsNested
	const prevExecContext = c.transaction._execContext
	try {
		// eslint-disable-next-line no-plusplus
		c.transaction._numMethodsNested++
		c.transaction._execContext = c.docRef.path
		return await f()
	} finally {
		c.transaction._numMethodsNested = prevNumMethodsNested
		c.transaction._execContext = prevExecContext
	}
}
