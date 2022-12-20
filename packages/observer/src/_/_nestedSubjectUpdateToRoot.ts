// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NestedSubjectImpl } from '~/NestedSubjectImpl'

/** @internal */
export function _nestedSubjectUpdateToRoot(node: NestedSubjectImpl<any>) {
	while (node._parent) {
		// console.log('set exists', node._subject$.value)
		node._exists = true
		let parentValue = node._parent._value as object

		if (Array.isArray(parentValue)) {
			const newParentValue = [...(parentValue as unknown[])]
			newParentValue[node._parentKey as never] = node._value
			parentValue = newParentValue
		} else {
			parentValue = {
				...parentValue,
				[node._parentKey as never]: node._value as never,
			}
			// if (!node._exists) delete parentValue[node._parentKey as never]
		}

		node._parent._value = parentValue
		node._parent._subject$.next(parentValue)
		// eslint-disable-next-line no-param-reassign
		node = node._parent as never
	}
}
