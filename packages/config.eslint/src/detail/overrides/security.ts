// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

// @ts-expect-error no typings
import securityPlugin from 'eslint-plugin-security'

export const security = defineEslintFlatConfig(
	securityPlugin.configs.recommended,
	{
		// files: ['*'],

		// plugins: ['security'],
		// extends: ['plugin:security/recommended'], // bugged - does not pass eslint schema validation

		rules: {
			'security/detect-unsafe-regex': 1,
			'security/detect-buffer-noassert': 1,
			'security/detect-child-process': 1,
			'security/detect-disable-mustache-escape': 1,
			'security/detect-eval-with-expression': 1,
			'security/detect-no-csrf-before-method-override': 1,
			'security/detect-non-literal-fs-filename': 1,
			'security/detect-non-literal-regexp': 1,
			'security/detect-non-literal-require': 0, // bugged when `require` called without argument
			'security/detect-object-injection': 0, // have to disable everywhere... too many false positives
			'security/detect-possible-timing-attacks': 1,
			'security/detect-pseudoRandomBytes': 1,
			'security/detect-new-buffer': 1,
			'security/detect-bidi-characters': 1,
		},
	} as const,
)
