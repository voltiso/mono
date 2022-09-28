// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IUnion, SchemableLike } from '@voltiso/schemar.types'
import { isUnion } from '@voltiso/schemar.types'

import { union } from '../Union'

/** @internal */
export function _flattenUnion(s: SchemableLike): IUnion {
	if (!isUnion(s)) return union(s)

	let schemas = [] as SchemableLike[]

	for (const child of s.getSchemas) {
		// eslint-disable-next-line etc/no-internal
		const flattenedChild = _flattenUnion(child)
		if (isUnion(flattenedChild))
			schemas = [...schemas, ...flattenedChild.getSchemas]
		else schemas.push(flattenedChild)
	}

	return union(...schemas)
}
