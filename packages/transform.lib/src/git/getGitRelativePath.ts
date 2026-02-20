// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { strict as assert } from 'node:assert'
import * as path from 'node:path'

import { getGitForDir } from './getGitForDir.js'

export function getGitRelativePath(file: string): string | undefined {
	file = path.resolve(file)

	const gitPath = getGitForDir(path.dirname(file))
	if (!gitPath) return undefined

	assert(file.startsWith(gitPath))
	return file.slice(gitPath.length + 1)
}
