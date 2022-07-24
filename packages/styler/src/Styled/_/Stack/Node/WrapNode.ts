// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	ChildElement,
	IChildElement,
} from '../../../../_/StyledData/_/ChildElement'
import type { Props } from '../../../../react-types'

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