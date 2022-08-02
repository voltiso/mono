// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { VPartial } from '@voltiso/util'

import type { Props } from '~/react-types'

export interface PropsNode<P extends Props> {
	props: VPartial<P>
}

export interface IPropsNode {
	props: Props
}

export function isPropsNode(x: unknown): x is IPropsNode {
	return Boolean((x as IPropsNode).props)
}
