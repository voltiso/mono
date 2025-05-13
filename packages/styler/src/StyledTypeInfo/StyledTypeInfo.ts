// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type React from 'react'

import type { IntrinsicElement } from '~/Stylable'
import type { NativeElement } from '~/StyledComponent'

export type StyledSubject =
	| IntrinsicElement
	| React.ComponentType<any>
	| React.Component<any, any, any> // catches react-native native elements
	| NativeElement // e.g. HTMLButtonElement

export interface StyledTypeInfo {
	Component: StyledSubject | null
	// | React.Component<any, any, any>
	// | NativeElement
	// | StylableLike
	// | null

	Props: object
	CustomCss: object
}
