// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $AssumeType } from '@voltiso/util'

import type { _CustomDocRef, $$DocRef } from '~/DocRef'

export function getOnGetTriggers(docRef: $$DocRef) {
	// eslint-disable-next-line etc/no-internal
	$AssumeType<_CustomDocRef>(docRef)
	if (docRef._onGets) return docRef._onGets

	docRef._onGets = []

	for (const { getPathMatches, trigger } of docRef._context.transactor
		._allOnGets) {
		const pathMatches = getPathMatches(docRef.path.toString())

		if (pathMatches) docRef._onGets.push({ pathMatches, trigger })
	}

	return docRef._onGets
}
