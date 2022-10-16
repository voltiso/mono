// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocRefBaseImpl } from '~/DocRef'

export function getMethods(this: DocRefBaseImpl) {
	if (this._methods) return this._methods

	this._methods = []

	for (const { getPathMatches, name, method } of this._context.transactor
		._allMethods) {
		const pathMatches = getPathMatches(this.path.toString())

		if (pathMatches) this._methods.push({ pathMatches, name, method })
	}

	return this._methods
}