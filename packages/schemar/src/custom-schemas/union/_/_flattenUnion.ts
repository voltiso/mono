// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable, IUnion } from '@voltiso/schemar.types'
import { isUnion } from '@voltiso/schemar.types'

import { union } from '../Union'

/** @internal */
export function _flattenUnion(s: $$Schemable): IUnion {
	if (!isUnion(s)) return union(s as never) as never

	let schemas = [] as $$Schemable[]

	for (const child of s.getSchemas) {
		// eslint-disable-next-line etc/no-internal
		const flattenedChild = _flattenUnion(child)
		if (isUnion(flattenedChild))
			schemas = [...schemas, ...flattenedChild.getSchemas]
		else schemas.push(flattenedChild)
	}

	return union(...schemas) as never
}
