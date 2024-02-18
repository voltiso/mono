// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ICssProp } from '~/_/CssProps'

export type PropValueFromCssProp<
	C extends ICssProp<CustomCss>,
	CustomCss extends object,
> = C extends () => unknown
	? boolean
	: C extends (propValue: infer PV) => unknown
		? PV
		: boolean
