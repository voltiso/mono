// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Rule } from 'eslint'
import * as path from 'node:path'

const typescriptExtensions = new Set(['.ts', '.cts', '.mts'])

/**
 * Determine if the context source file is typescript.
 *
 * @param context - A context
 */
export function isTypescript(context: Rule.RuleContext): boolean {
	const sourceFileExt = path.extname(context.getPhysicalFilename())
	return typescriptExtensions.has(sourceFileExt)
}
