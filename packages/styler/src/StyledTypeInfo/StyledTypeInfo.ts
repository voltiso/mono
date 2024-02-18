// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { StylableLike } from '~/Stylable'
import type { NativeElement } from '~/StyledComponent'

export interface StyledTypeInfo {
	Component: StylableLike | NativeElement | null
	Props: object
	CustomCss: object
}
