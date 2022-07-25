// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IDoc } from '../../Doc'
import type { StrongDocRef_ } from '../StrongDocRef.js'

export function getOnGetTriggers(this: StrongDocRef_<IDoc>) {
	if (this._onGets) return this._onGets

	this._onGets = []

	for (const { getPathMatches, trigger } of this._context.transactor
		._allOnGets) {
		const pathMatches = getPathMatches(this.path.toString())

		if (pathMatches) this._onGets.push({ pathMatches, trigger })
	}

	return this._onGets
}
