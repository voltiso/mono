// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { VPartial } from '@voltiso/util'

import type { Props } from '../../../../react-types'
import type { GetStyleNode, IGetStyleNode } from './GetStyleNode.js'
import type { IMapPropsNode, MapPropsNode } from './MapPropsNode.js'
import type { IPropsNode, PropsNode } from './PropsNode.js'
import type { IRemovePropsNode, RemovePropsNode } from './RemovePropsNode.js'
import type { StyleNode } from './StyleNode.js'
import type { IWrapNode, WrapNode } from './WrapNode.js'

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
