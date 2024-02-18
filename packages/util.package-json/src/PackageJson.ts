// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// eslint-disable-next-line import/no-deprecated
import type { FullVersion } from 'package-json'

/** 💡 Fine-tune using **Declaration Merging** */
export interface PackageJson extends FullVersion {
	typesVersions?: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'*': Record<string, unknown>
	}
}
