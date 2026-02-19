// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { equals } from './equals'

export function mapEquals(
	a: Map<unknown, unknown>,
	b: Map<unknown, unknown>,
): b is typeof a {
	if (a.size !== b.size) return false

	for (const [key, value] of a)
		if (!b.has(key) || !equals(value, b.get(key))) return false

	return true
}
