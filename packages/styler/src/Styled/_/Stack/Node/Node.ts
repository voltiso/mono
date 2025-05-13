// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Props } from '~/react-types'

import type { GetStyleNode, IGetStyleNode } from './GetStyleNode'
import type { IMapPropsNode, MapPropsNode } from './MapPropsNode'
import type { IPropsNode, PropsNode } from './PropsNode'
import type { IRemovePropsNode, RemovePropsNode } from './RemovePropsNode'
import type { StyleNode } from './StyleNode'
import type { IWrapNode, WrapNode } from './WrapNode'

export type INode = { customCss?: Props } & (
	| {}
	| StyleNode
	| IGetStyleNode
	| IPropsNode
	| IMapPropsNode
	| IRemovePropsNode
	| IWrapNode
)

export type Node<P extends Props> = { customCss?: Props } & (
	| {}
	| StyleNode
	| GetStyleNode<Partial<P>>
	| PropsNode<P>
	| MapPropsNode<Partial<P>, Partial<P>>
	| RemovePropsNode<P>
	| WrapNode<P>
)
