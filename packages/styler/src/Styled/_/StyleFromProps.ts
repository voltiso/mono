// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Css } from '~/Css/Css'
import type { RelaxedCustomCss } from '~/Css/RelaxedCss'

export interface StyleFromProps<P> {
	(props: P): Css
}

export interface RelaxedStyleFromProps<P> {
	(props: P): RelaxedCustomCss
}
