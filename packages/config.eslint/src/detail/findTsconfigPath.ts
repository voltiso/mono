// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable security/detect-non-literal-fs-filename */

import * as fs from 'node:fs'
import * as path from 'node:path'

const fileNames = [
	'tsconfig.eslint.json',
	'tsconfig.lint.json',
	'tsconfig.json',
]

export function findTsconfigPathSync(dir: string): string {
	let currentDir = path.resolve(dir)

	while (currentDir) {
		for (const fileName of fileNames) {
			const pathCand = path.join(currentDir, fileName)

			// eslint-disable-next-line n/no-sync
			if (fs.existsSync(pathCand)) return pathCand
		}

		currentDir = path.dirname(currentDir)
	}

	const message = `cannot find tsconfig file in ancestors of ${dir}`
	throw new Error(message)
}
