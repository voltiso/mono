// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $AssumeType } from '@voltiso/util'

import type { $$DocRef, WeakDocRef, DocRefMethodEntry } from '~/DocRef'

export function getMethods(ref: $$DocRef): DocRefMethodEntry[] {
	$AssumeType<WeakDocRef>(ref)
	if (ref._methods) return ref._methods

	ref._methods = []

	for (const { getPathMatches, name, method } of ref._context.transactor
		._allMethods) {
		const pathMatches = getPathMatches(ref.path.toString())

		if (pathMatches) ref._methods.push({ pathMatches, name, method })
	}

	return ref._methods
}
