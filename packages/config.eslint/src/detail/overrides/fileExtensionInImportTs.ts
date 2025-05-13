// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig, getAllRules } from '@voltiso/config.eslint.lib'
// @ts-expect-error no typings
import fileExtensionInImportTsPlugin from 'eslint-plugin-file-extension-in-import-ts'

export const fileExtensionInImportTsConfig = defineEslintFlatConfig({
	plugins: {
		'file-extension-in-import-ts': fileExtensionInImportTsPlugin as never,
	},

	rules: {
		...getAllRules(
			fileExtensionInImportTsPlugin as never,
			'file-extension-in-import-ts',
			'error',
		),

		'file-extension-in-import-ts/file-extension-in-import-ts': 0, // usually handled by our compat transform
	},
})
