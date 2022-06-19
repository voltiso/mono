import * as fs from 'fs/promises'
import { VoltisoScriptError } from '../VoltisoScriptError'
import { findPackageJsonSync } from './findPackageJson'
import type { PackageJson } from './packageJson'

export async function readPackageJson(): Promise<PackageJson> {
	const packageJsonPath = await findPackageJsonSync()
	const packageJsonBuffer = await fs.readFile(packageJsonPath)
	const packageJson = JSON.parse(packageJsonBuffer.toString()) as
		| PackageJson
		| undefined

	if (!packageJson) throw new VoltisoScriptError('cannot read package.json')

	return packageJson
}
