// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { fileExtensionInImport, noUselessPathSegments } from './rules'

export const rules = {
	'file-extension-in-import': fileExtensionInImport,
	'no-useless-path-segments': noUselessPathSegments,
}

// eslint-disable-next-line import/no-default-export
export default {
	rules,
}
