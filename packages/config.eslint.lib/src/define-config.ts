// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { EslintConfig, EslintConfigOverride } from './EslintConfig.js'

export function defineEslintConfig<C extends EslintConfig>(config: C) {
	return config
}

export function defineEslintConfigOverride<X extends EslintConfigOverride>(
	configOverride: X,
) {
	return configOverride
}

export function defineEslintConfigOverrideRules<
	X extends EslintConfigOverride['rules'],
>(configOverrideRules: X) {
	return configOverrideRules
}
