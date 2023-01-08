// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore ES module type-import (error when compiling CJS)
import type { FullVersion } from 'package-json'

/** 💡 Fine-tune using **Declaration Merging** */
export interface PackageJson extends FullVersion {
	typesVersions?: {
		'*': Record<string, unknown>
	}
}
