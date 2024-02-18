// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as fs from 'node:fs/promises'
import path from 'node:path'

import { getPackageJsonCached } from '@voltiso/util.node'

import { printInfo } from '~/_/printInfo'

import { getCompatDirNames } from './getCompatDirNames'

const dryRun = false // TODO: expose option

export async function cleanCompatDirs() {
	const packageJson = await getPackageJsonCached(path.resolve())
	const compatDirNames = getCompatDirNames(packageJson)

	await Promise.all(
		compatDirNames.map(async dirName => {
			const resolvedPath = path.resolve(dirName)

			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (dryRun) {
				printInfo('DRY RUN: would delete:', resolvedPath)
			} else {
				await fs.rm(resolvedPath, { recursive: true, force: true })
			}
		}),
	)
}
