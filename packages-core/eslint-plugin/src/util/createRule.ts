// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { ESLintUtils } from '@typescript-eslint/utils'

// eslint-disable-next-line new-cap
export const createRule = ESLintUtils.RuleCreator(
	name => `https://voltiso.com/eslint/rule/${name}`,
)
