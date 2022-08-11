// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Linter } from 'eslint'
import type { EslintConfig as DcEslintConfig } from 'eslint-define-config'
import type { Override } from 'eslint-define-config/src/overrides.js'

export type EslintConfig = Linter.Config & DcEslintConfig

export type EslintConfigOverride = Linter.ConfigOverride<Linter.RulesRecord> &
	Override
