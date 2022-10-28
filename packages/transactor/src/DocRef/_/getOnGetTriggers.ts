// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Doc } from '~/Doc'
import type { StrongDocRefImpl } from '~/DocRef'

export function getOnGetTriggers(docRef: StrongDocRefImpl<$$Doc>) {
	if (docRef._onGets) return docRef._onGets

	docRef._onGets = []

	for (const { getPathMatches, trigger } of docRef._context.transactor
		._allOnGets) {
		const pathMatches = getPathMatches(docRef.path.toString())

		if (pathMatches) docRef._onGets.push({ pathMatches, trigger })
	}

	return docRef._onGets
}
