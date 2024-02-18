// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Props } from '~/react-types'

export interface IRemovePropsNode {
	removeProps: string[]
}

export interface RemovePropsNode<P extends Props> extends IRemovePropsNode {
	removeProps: (keyof P & string)[]
}

export function isRemovePropsNode(x: unknown): x is IRemovePropsNode {
	return Boolean((x as IRemovePropsNode).removeProps)
}
