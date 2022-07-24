// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocRefBase_ } from '../DocRefBase'

export function getBeforeCommits(this: DocRefBase_) {
	if (this._beforeCommits) return this._beforeCommits

	this._beforeCommits = []

	for (const { getPathMatches, trigger } of this._context.transactor
		._allBeforeCommits) {
		const pathMatches = getPathMatches(this.path.toString())

		if (pathMatches) this._beforeCommits.push({ pathMatches, trigger })
	}

	if (this._context.transactor.refCounters) {
		this._beforeCommits.push({
			pathMatches: { pathArgs: [], pathParams: {} },

			trigger: ({ doc, path, __voltiso }) => {
				if (!doc && __voltiso && __voltiso.numRefs !== 0) {
					throw new Error(
						`cannot delete ${path.toString()}: numRefs is ${
							__voltiso.numRefs
						} (should be 0)`,
					)
				}
			},
		})
	}

	return this._beforeCommits
}
