// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Linter } from 'eslint'

// @ts-ignore the referenced file is an ECMAScript module
import type { FlatESLintConfig as DcFlatESLintConfig } from 'eslint-define-config'

export type EslintFlatConfig = Linter.FlatConfig & DcFlatESLintConfig

// type A = Linter.FlatConfig['extends']
// type B = DcFlatESLintConfig['extends']

// type C = EslintFlatConfig['extends']
