// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Props } from '~/react-types'

import type { IMapProps, MapProps } from './MapProps'

export interface IMapPropsNode {
	mapProps: IMapProps
}

export interface MapPropsNode<OP extends Props, IP extends Props> {
	mapProps: MapProps<OP, IP>
}

export function isMapPropsNode(x: unknown): x is IMapPropsNode {
	return Boolean((x as IMapPropsNode).mapProps)
}
