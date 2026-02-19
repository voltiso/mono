// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { strict as assert } from 'node:assert'
import * as path from 'node:path'

import { getGitForDir } from './getGitForDir.js'

export function getGitRelativePath(file: string): string | undefined {
	// eslint-disable-next-line no-param-reassign
	file = path.resolve(file)

	const gitPath = getGitForDir(path.dirname(file))
	if (!gitPath) return undefined

	// eslint-disable-next-line unicorn/consistent-assert
	assert(file.startsWith(gitPath))
	return file.slice(gitPath.length + 1)
}
