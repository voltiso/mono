// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocRefBaseImpl } from '~/Ref'

export function getBeforeCommits(docRef: DocRefBaseImpl) {
	if (docRef._beforeCommits) return docRef._beforeCommits

	docRef._beforeCommits = []

	for (const { getPathMatches, trigger } of docRef._context.transactor
		._allBeforeCommits) {
		const pathMatches = getPathMatches(docRef.path.toString())

		if (pathMatches) docRef._beforeCommits.push({ pathMatches, trigger })
	}

	if (docRef._context.transactor.refCounters) {
		docRef._beforeCommits.push({
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

	return docRef._beforeCommits
}
