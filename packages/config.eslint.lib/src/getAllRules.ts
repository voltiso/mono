// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Linter } from 'eslint'

export function getAllRules(
	plugin: { rules: Record<string, unknown> },
	prefix: string,
	value: 'error' | 'off' | 'warn' | 0 | 1 | 2 = 'warn',
): Record<string, Linter.RuleEntry> {
	return Object.fromEntries(
		Object.keys(plugin.rules).map(rule => [`${prefix}/${rule}`, value]),
	)
}
