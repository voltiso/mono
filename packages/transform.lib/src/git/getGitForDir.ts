// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { statSync } from 'node:fs'
import * as path from 'node:path'

export function getGitForDirUncached(dir: string): string | undefined {
	// eslint-disable-next-line no-param-reassign
	dir = path.resolve(dir)

	let current = dir

	for (;;) {
		const gitDirPath = path.join(current, '.git')

		try {
			// eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync
			const stats = statSync(gitDirPath)

			if (stats.isDirectory()) {
				return current
			}
		} catch {}

		const next = path.dirname(current)
		if (next === current) return undefined
		current = next
	}
}

const cache = new Map<string, string | undefined>()

export function getGitForDir(dir: string): string | undefined {
	if (!cache.has(dir)) {
		const result = getGitForDirUncached(dir)
		cache.set(dir, result)
	}

	return cache.get(dir)
}
