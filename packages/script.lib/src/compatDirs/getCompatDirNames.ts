// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { PackageJson } from '@voltiso/util'

import { VoltisoScriptError } from '~/VoltisoScriptError'

export function getCompatDirNames(packageJson: PackageJson): string[] {
	const obj = packageJson.typesVersions?.['*']

	if (!obj) {
		throw new VoltisoScriptError("no `typesVersions['*']` in `package.json`")
	}

	return Object.keys(obj)
}
