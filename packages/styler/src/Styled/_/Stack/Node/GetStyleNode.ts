// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
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
	// eslint-disable-next-line @typescript-eslint/unbound-method
	return Boolean((x as IGetStyleNode | undefined)?.getStyle)
}
