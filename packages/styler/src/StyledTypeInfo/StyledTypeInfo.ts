// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type React from 'react'

import type { StylableLike } from '~/Stylable'
import type { NativeElement } from '~/StyledComponent'

export interface StyledTypeInfo {
	Component:
		| React.Component<any, any, any>
		| NativeElement
		| StylableLike
		| null
	Props: object
	CustomCss: object
}
