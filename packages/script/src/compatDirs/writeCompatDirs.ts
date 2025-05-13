// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as fs from 'node:fs/promises'
import * as path from 'node:path'

import { getPackageJsonCached } from '@voltiso/util.node'

import { printInfo } from '~/_/printInfo'
import { VoltisoScriptError } from '~/VoltisoScriptError'

import { getCompatDirNames } from './getCompatDirNames'

export async function writeCompatDirs(): Promise<void> {
	const packageJson = await getPackageJsonCached(path.resolve())

	const compatDirsNames = getCompatDirNames(packageJson)

	for (const name of compatDirsNames) {
		try {
			// eslint-disable-next-line no-await-in-loop, security/detect-non-literal-fs-filename
			await fs.mkdir(name)
			printInfo('created dir:', name)
		} catch {}

		const data = {
			types: `../dist/cjs/${name}/index.d.ts`,
			module: `../dist/esm/${name}/index.js`,
			main: `../dist/cjs/${name}/index.js`,
			sideEffects: false,
		}

		// eslint-disable-next-line no-await-in-loop
		const gitignore = await fs.readFile('.gitignore')
		const lines = gitignore.toString()
		const wantLine = `/${name}/`

		if (!lines.includes(wantLine)) {
			const message = `Please add '${wantLine}' to '.gitignore'!`
			throw new VoltisoScriptError(message)
		}

		const wantEntry = `${name}/`

		if (!packageJson.files?.includes(wantEntry)) {
			const message = `Please add '${wantEntry}' to 'package.json/files'`
			throw new VoltisoScriptError(message)
		}

		try {
			// eslint-disable-next-line no-await-in-loop, security/detect-non-literal-fs-filename
			await fs.writeFile(
				path.join(name, 'package.json'),
				`${JSON.stringify(data, null, 2)}\n`,
				{ flag: 'w' },
			)
		} catch {}
	}
}
