// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { fastAssert } from '@voltiso/util'

export function isWithVoltisoEntry(
	data: unknown,
): data is { __voltiso: unknown } {
	return !!(data as { __voltiso: any } | null)?.__voltiso
}

export function omitVoltisoEntry<D extends object>(
	data: D,
): Omit<D, '__voltiso'> {
	fastAssert(isWithVoltisoEntry(data))

	const result = { ...data }
	delete result.__voltiso
	return result
}
