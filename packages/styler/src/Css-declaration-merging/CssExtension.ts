// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { RelaxedCustomCss } from '~/Css/RelaxedCss'

export interface CssExtension<AdditionalCss extends object = {}> {
	_?: RelaxedCustomCss<AdditionalCss> | undefined
}
