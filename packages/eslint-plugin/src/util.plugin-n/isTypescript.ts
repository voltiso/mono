// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as path from 'node:path'

import type { Rule } from 'eslint'

const typescriptExtensions = new Set(['.ts', '.cts', '.mts'])

/**
 * Determine if the context source file is typescript.
 *
 * @param context - A context
 */
export function isTypescript(context: Rule.RuleContext): boolean {
	const sourceFileExt = path.extname(context.physicalFilename)
	return typescriptExtensions.has(sourceFileExt)
}
