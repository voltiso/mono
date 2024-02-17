// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as path from 'node:path'

import type { Rule } from 'eslint'

import { isTypescript } from './isTypescript'

const mapping = {
	'': '.js', // default empty extension will map to js
	'.ts': '.js',
	'.cts': '.cjs',
	'.mts': '.mjs',
} as const

function isMappingKey(x: unknown): x is keyof typeof mapping {
	if (typeof x !== 'string') return false

	return Object.prototype.hasOwnProperty.call(mapping, x)
}

//

const reverseMapping = {
	'.js': '.ts',
	'.cjs': '.cts',
	'.mjs': '.mts',
} as const

function isReverseMappingKey(x: unknown): x is keyof typeof reverseMapping {
	if (typeof x !== 'string') return false

	return Object.prototype.hasOwnProperty.call(reverseMapping, x)
}

/**
 * Maps the typescript file extension that should be added in an import
 * statement, based on the given file extension of the referenced file OR
 * fallbacks to the original given extension.
 *
 * For example, in typescript, when referencing another typescript from a
 * typescript file, a .js extension should be used instead of the original .ts
 * extension of the referenced file.
 *
 * @param context - A context
 * @param filePath - The filePath of the import
 * @param fallbackExtension - The non-typescript fallback
 * @param reverse - Execute a reverse path mapping
 * @returns The file extension to append to the import statement.
 */
// eslint-disable-next-line @typescript-eslint/max-params
export function mapTypescriptExtension(
	context: Readonly<Rule.RuleContext>,
	filePath: string,
	fallbackExtension: string,
	reverse = false,
): string {
	const ext = path.extname(filePath)

	if (reverse) {
		if (isTypescript(context) && isReverseMappingKey(ext)) {
			return reverseMapping[ext]
		}
	} else if (isTypescript(context) && isMappingKey(ext)) {
		return mapping[ext]
	}

	return fallbackExtension
}
