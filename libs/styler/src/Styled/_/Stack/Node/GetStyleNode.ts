// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Css } from '~/Css/Css'
import type { Props } from '~/react-types'

export interface GetStyleNode<P extends Props> {
	getStyle(props: P): Css
}

export interface IGetStyleNode {
	getStyle(props: any): Css
}

export function isGetStyleNode(x: unknown): x is IGetStyleNode {
	return Boolean((x as IGetStyleNode | undefined)?.getStyle)
}
