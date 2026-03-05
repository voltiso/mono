// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Css } from '~/Css/Css'
import type { RelaxedCustomCss } from '~/Css/RelaxedCss'

export interface StyleFromProps<P> {
	// biome-ignore lint/style/useShorthandFunctionType: .
	(props: P): Css
}

export interface RelaxedStyleFromProps<P> {
	// biome-ignore lint/style/useShorthandFunctionType: .
	(props: P): RelaxedCustomCss
}
