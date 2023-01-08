// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Rule } from 'eslint'

// eslint-disable-next-line tsdoc/syntax
/** @author Toru Nagashima See LICENSE file in root directory for full license. */

const DEFAULT_VALUE = Object.freeze(['.js', '.json', '.node'])

/**
 * Gets `tryExtensions` property from a given option object.
 *
 * @param option - An option object to get.
 * @returns The `tryExtensions` value, or `null`.
 */
function get(
	option?: { tryExtensions: string[] } | undefined,
): string[] | null {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (option && option.tryExtensions && Array.isArray(option.tryExtensions)) {
		return option.tryExtensions.map(String)
	}

	return null
}

/**
 * Gets "tryExtensions" setting.
 *
 * 1. This checks `options` property, then returns it if exists.
 * 2. This checks `settings.n` | `settings.node` property, then returns it if
 *    exists.
 * 3. This returns `[".js", ".json", ".node"]`.
 *
 * @param context - The rule context.
 * @returns A list of extensions.
 */
export function getTryExtensions(
	context: Rule.RuleContext,
	optionIndex = 0,
): readonly string[] {
	return (
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, security/detect-object-injection, @typescript-eslint/no-unnecessary-condition
		get(context.options && context.options[optionIndex]) ||
		get(
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unnecessary-condition
			context.settings && (context.settings['n'] || context.settings['node']),
		) ||
		DEFAULT_VALUE
	)
}

// export const schema = {
// 	type: 'array',

// 	items: {
// 		type: 'string',
// 		pattern: '^\\.',
// 	},

// 	uniqueItems: true,
// }
