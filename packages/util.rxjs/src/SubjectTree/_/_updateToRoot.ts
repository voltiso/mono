// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import * as s from '@voltiso/schemar'

import type { _CustomSubjectTree } from '~'

/** @internal */
export function _updateToRoot(node: _CustomSubjectTree<any>): void {
	while (node._parent) {
		// console.log('set exists', node._subject$.value)
		node._exists = true
		let parentValue = node._parent._value

		if (Array.isArray(parentValue)) {
			const newParentValue = [...(parentValue as unknown[])]
			newParentValue[node._parentKey as never] = node._value
			parentValue = newParentValue as never
		} else {
			$assert(s.plainObject.or(undefined), parentValue)

			parentValue = {
				...parentValue,
				[node._parentKey as never]: node._value as never,
			} as never
			// if (!node._exists) delete parentValue[node._parentKey as never]
		}

		node._parent._value = parentValue
		node._parent._subject$.next(parentValue)
		// eslint-disable-next-line no-param-reassign
		node = node._parent as never
	}
}
