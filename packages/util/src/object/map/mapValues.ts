// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Value } from '~/object'
import { getEntries, setProperty } from '~/object'

export function mapValues<Obj extends object, B>(
	obj: Obj,
	mapping: (value: Value<Obj>) => B,
): Record<keyof Obj, B> {
	const result = {} as Record<keyof Obj, B>

	for (const [key, value] of getEntries(obj)) {
		setProperty(result, key, mapping(value as never) as never)
	}

	return result
}
