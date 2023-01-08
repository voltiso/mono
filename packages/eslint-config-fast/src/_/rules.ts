// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverrideRules } from '@voltiso/config.eslint.lib'

// ! @typescript-eslint

export const fastTypescriptRules = defineEslintConfigOverrideRules({
	// requiring-type-checking off
	'@typescript-eslint/await-thenable': 0,
	'@typescript-eslint/no-floating-promises': 0,
	'@typescript-eslint/no-for-in-array': 0,
	'no-implied-eval': 1,
	'@typescript-eslint/no-implied-eval': 0,
	'@typescript-eslint/no-misused-promises': 0,
	'@typescript-eslint/no-unnecessary-type-assertion': 0,
	'@typescript-eslint/no-unsafe-argument': 0,
	'@typescript-eslint/no-unsafe-assignment': 0,
	'@typescript-eslint/no-unsafe-call': 0,
	'@typescript-eslint/no-unsafe-member-access': 0,
	'@typescript-eslint/no-unsafe-return': 0,
	'require-await': 1,
	'@typescript-eslint/require-await': 0,
	'@typescript-eslint/restrict-plus-operands': 0,
	'@typescript-eslint/restrict-template-expressions': 0,
	'@typescript-eslint/unbound-method': 0,
})

// ! IMPORT

const fastImportStaticAnalysisRules = defineEslintConfigOverrideRules({
	'import/no-unresolved': 0, // ! 'error'
	'import/no-relative-packages': 0, // ! 'error
	'import/default': 0, //! TS does the same?
	'import/no-restricted-paths': 0,
	'import/no-absolute-path': 0,
	'import/no-dynamic-require': 0,
	'import/no-self-import': 0,

	// '@voltiso/no-useless-path-segments': 0, // ! useful
})

const fastImportHelpfulWarningsRules = defineEslintConfigOverrideRules({
	'import/export': 0,
	'import/no-named-as-default': 0, // TS does not do this
	'import/no-named-as-default-member': 0, //! TS does the same?
	'import/no-deprecated': 0, // TS does not do this
	'import/no-mutable-exports': 0,
	'import/no-unused-modules': 0, // TS does not do this
})

const fastImportModuleSystemsRules = defineEslintConfigOverrideRules({
	'import/unambiguous': 0,
	'import/no-commonjs': 0,
	'import/no-amd': 0,
	'import/no-import-module-exports': 0,
})

const fastImportStyleGuideRules = defineEslintConfigOverrideRules({
	'import/first': 0,
	'import/newline-after-import': 0,
	'import/no-unassigned-import': 0,
	'import/no-named-default': 0,
	'import/no-default-export': 0,
	'import/no-anonymous-default-export': 0,
	'import/dynamic-import-chunkname': 0,
})

export const fastImportRules = defineEslintConfigOverrideRules({
	...fastImportHelpfulWarningsRules,
	...fastImportModuleSystemsRules,
	...fastImportStaticAnalysisRules,
	...fastImportStyleGuideRules,
})
