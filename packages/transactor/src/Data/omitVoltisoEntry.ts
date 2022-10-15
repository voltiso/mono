// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/util'

export function isWithVoltisoEntry(
	data: unknown,
): data is { __voltiso: unknown } {
	return !!(data as { __voltiso: any } | null)?.__voltiso
}

export function omitVoltisoEntry<D extends object>(
	data: D,
): Omit<D, '__voltiso'> {
	assert(isWithVoltisoEntry(data))

	const result = { ...data }
	delete result.__voltiso
	return result
}
