// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NestedSubjectImpl } from '~/NestedSubjectImpl'

/** @internal */
export function _nestedSubjectUpdateToRoot(node: NestedSubjectImpl<any>) {
	while (node._parent) {
		let parentValue = node._parent._subject$.value as object
		if (Array.isArray(parentValue)) {
			const newParentValue = [...(parentValue as unknown[])]
			newParentValue[node._parentKey as never] = node._subject$.value
			parentValue = newParentValue
		} else {
			parentValue = {
				...parentValue,
				[node._parentKey as never]: node._subject$.value as never,
			}
		}

		node._parent._subject$.next(parentValue)
		// eslint-disable-next-line no-param-reassign
		node = node._parent as never
	}
}
