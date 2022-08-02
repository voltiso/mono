// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { VPartial } from '@voltiso/util'

import type { Props } from '~/react-types'

import type { GetStyleNode, IGetStyleNode } from './GetStyleNode'
import type { IMapPropsNode, MapPropsNode } from './MapPropsNode'
import type { IPropsNode, PropsNode } from './PropsNode'
import type { IRemovePropsNode, RemovePropsNode } from './RemovePropsNode'
import type { StyleNode } from './StyleNode'
import type { IWrapNode, WrapNode } from './WrapNode'

export type INode =
	| StyleNode
	| IGetStyleNode
	| IPropsNode
	| IMapPropsNode
	| IRemovePropsNode
	| IWrapNode

export type Node<P extends Props> =
	| StyleNode
	| GetStyleNode<VPartial<P>>
	| PropsNode<P>
	| MapPropsNode<VPartial<P>, VPartial<P>>
	| RemovePropsNode<P>
	| WrapNode<P>
