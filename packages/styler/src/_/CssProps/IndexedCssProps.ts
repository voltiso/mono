// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ICssProp } from './ICssProp.js'

export interface IndexedCssProps {
	[k: string]: ICssProp[]
}

export interface IndexedCssPropsSingle {
	[k: string]: ICssProp
}
