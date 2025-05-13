// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { combinePatches, isDeleteIt, isPatchSentinel } from '@voltiso/util'

import { TransactorError } from '~/error'

export function combineUpdates(a: unknown, b: unknown): unknown {
	if ((!a || isDeleteIt(a)) && !isPatchSentinel(b))
		throw new TransactorError('cannot update non-existing document')
	return combinePatches(a, b)
}
