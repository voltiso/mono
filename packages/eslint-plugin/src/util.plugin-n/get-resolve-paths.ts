// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import type { RuleContext } from '@typescript-eslint/utils/dist/ts-eslint'

const DEFAULT_VALUE = Object.freeze([])

/**
 * Gets `resolvePaths` property from a given option object.
 *
 * @param option - An option object to get.
 * @returns The `allowModules` value, or `null`.
 */
function get(option: { resolvePaths?: unknown } | undefined) {
	if (option?.resolvePaths && Array.isArray(option.resolvePaths)) {
		return option.resolvePaths.map(String)
	}

	return null
}

/**
 * Gets "resolvePaths" setting.
 *
 * 1. This checks `options` property, then returns it if exists.
 * 2. This checks `settings.node` property, then returns it if exists.
 * 3. This returns `[]`.
 *
 * @param context - The rule context.
 * @returns A list of extensions.
 */
function getResolvePaths(
	context: RuleContext<string, unknown[]>,
	optionIndex = 0,
) {
	return (
		get(context.options?.[optionIndex] as never) ||
		get(context.settings?.['node'] as never) ||
		DEFAULT_VALUE
	)
}

getResolvePaths.schema = {
	items: { type: 'string' },
	type: 'array',
	uniqueItems: true,
}

export default getResolvePaths
