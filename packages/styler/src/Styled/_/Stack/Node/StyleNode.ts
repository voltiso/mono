// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Css } from '../../../../Css.js'

export interface StyleNode {
	style: Css
}

export function isStyleNode(x: unknown): x is StyleNode {
	return Boolean((x as StyleNode).style)
}