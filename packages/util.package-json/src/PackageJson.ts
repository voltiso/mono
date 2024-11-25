// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { FullVersion } from 'package-json'

/** 💡 Fine-tune using **Declaration Merging** */
export interface PackageJson extends FullVersion {
	typesVersions?: {
		'*': Record<string, unknown>
	}

	files?: string[]
}
