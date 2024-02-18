// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Props } from '~/react-types'

import type { INode, Node } from './Node'

export type IStack = INode[]

export type Stack<P extends Props> = Node<P>[]
