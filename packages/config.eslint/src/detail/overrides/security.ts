// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getAllRules } from '@voltiso/config.eslint.lib'
import { defineConfig } from 'eslint/config'
// @ts-expect-error no typings
import securityPlugin from 'eslint-plugin-security'

export const securityConfig = defineConfig(
	// securityPlugin.configs.recommended,
	{
		// files: ['*'],

		plugins: {
			security: securityPlugin as never,
		},

		// extends: ['plugin:security/recommended'], // bugged - does not pass eslint schema validation

		rules: {
			...getAllRules(securityPlugin as never, 'security', 'warn'),

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
	},
)
