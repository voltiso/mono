// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { strict as assert } from 'node:assert'
import { dirname, resolve } from 'node:path'

import { getGitForDir } from './getGitForDir'

export function getGitRelativePath(file: string): string | undefined {
	// eslint-disable-next-line no-param-reassign
	file = resolve(file)

	const gitPath = getGitForDir(dirname(file))
	if (!gitPath) return undefined

	assert(file.startsWith(gitPath))
	return file.slice(gitPath.length + 1)
}
