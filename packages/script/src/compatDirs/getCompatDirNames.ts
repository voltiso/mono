// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoScriptError } from '~/VoltisoScriptError'

interface PackageJson {
	exports?: unknown
	typesVersions?: Record<string, unknown>
}

export function getCompatDirNames(packageJson: PackageJson): string[] {
	const exportsKeys = Object.keys(packageJson['exports'] ?? {})

	if (exportsKeys.length === 0) return []

	if (exportsKeys.length === 1 && exportsKeys[0] === '.') {
		return []
	}

	const obj = packageJson.typesVersions?.['*']

	if (!obj) {
		throw new VoltisoScriptError("no `typesVersions['*']` in `package.json`")
	}

	return Object.keys(obj)
}
