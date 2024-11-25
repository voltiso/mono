// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $AssumeType } from '@voltiso/util'

import type { _CustomDocRef, $$DocRef, DocRefTriggerEntry } from '~/DocRef'
import type { OnGetTrigger } from '~/Trigger/Trigger'

export type __hack_getOnGetTriggers = DocRefTriggerEntry | OnGetTrigger

export function getOnGetTriggers(
	docRef: $$DocRef,
): DocRefTriggerEntry<OnGetTrigger>[] {
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
