// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Linter } from 'eslint'
import type { FlatESLintConfig as DcFlatESLintConfig } from 'eslint-define-config'

export type EslintFlatConfig = Linter.Config & DcFlatESLintConfig

// type A = Linter.FlatConfig['extends']
// type B = DcFlatESLintConfig['extends']

// type C = EslintFlatConfig['extends']
