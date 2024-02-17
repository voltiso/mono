// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Linter } from 'eslint'

import type {
	ESLintConfig as DcEslintConfig,
	Override,
	// @ts-ignore the referenced file is an ECMAScript module
} from 'eslint-define-config'

export type EslintConfig = Linter.Config & DcEslintConfig

export type EslintConfigOverride = Linter.ConfigOverride<Linter.RulesRecord> &
	Override
