// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocRefBase_ } from '../DocRefBase'

export function getMethods(this: DocRefBase_) {
	if (this._methods) return this._methods

	this._methods = []

	for (const { getPathMatches, name, method } of this._context.transactor
		._allMethods) {
		const pathMatches = getPathMatches(this.path.toString())

		if (pathMatches) this._methods.push({ pathMatches, name, method })
	}

	return this._methods
}
