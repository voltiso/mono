// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { ESLintUtils } from '@typescript-eslint/utils'

export const createRule = ESLintUtils.RuleCreator(
	name => `https://www.voltiso.com/eslint/rules/${name}`,
)
