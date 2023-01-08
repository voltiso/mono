// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ICssProp } from './ICssProp'

export interface IndexedCssProps<AdditionalCss extends object> {
	[k: string]: ICssProp<AdditionalCss>[]
}

export interface IndexedCssPropsSingle<AdditionalCss extends object> {
	[k: string]: ICssProp<AdditionalCss>
}
