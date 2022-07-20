// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { FullVersion } from 'package-json'

import { readPackageJsonSync } from './readPackageJsonSync.js'

/** 💡 Fine-tune using **Declaration Merging** */
export interface PackageJson extends FullVersion {
	typesVersions?: {
		'*': Record<string, unknown>
	}
}

let realPackageJson: PackageJson | undefined
const proxyTarget = {}

export const packageJson: PackageJson = new Proxy(proxyTarget, {
	get(t, p, r) {
		if (!realPackageJson) {
			realPackageJson = readPackageJsonSync()
			Object.setPrototypeOf(proxyTarget, realPackageJson)
		}

		return Reflect.get(t, p, r) as never
	},
}) as PackageJson
