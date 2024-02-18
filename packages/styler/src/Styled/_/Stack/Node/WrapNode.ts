// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ChildElement } from '~/_/StyledData/_/ChildElement/ChildElement'
import type { IChildElement } from '~/_/StyledData/_/ChildElement/IChildElement'
import type { Props } from '~/react-types'

export interface IWrapNode {
	wrap: IChildElement[]
}

export interface WrapNode<P extends Props> extends IWrapNode {
	wrap: ChildElement<P>[]
	isWrapBefore?: boolean
}

export function isWrapNode(x: unknown): x is IWrapNode {
	return Boolean((x as IWrapNode).wrap)
}
