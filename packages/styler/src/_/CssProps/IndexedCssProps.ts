// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ICssProp } from './ICssProp'

export interface IndexedCssProps<CustomCss extends object> {
	[k: string]: ICssProp<CustomCss>[]
}

export interface IndexedCssPropsSingle<CustomCss extends object> {
	[k: string]: ICssProp<CustomCss>
}
