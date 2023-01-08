// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocRef } from '~/DocRef'

export function getOnGetTriggers(docRef: DocRef) {
	if (docRef._onGets) return docRef._onGets

	docRef._onGets = []

	for (const { getPathMatches, trigger } of docRef._context.transactor
		._allOnGets) {
		const pathMatches = getPathMatches(docRef.path.toString())

		if (pathMatches) docRef._onGets.push({ pathMatches, trigger })
	}

	return docRef._onGets
}
