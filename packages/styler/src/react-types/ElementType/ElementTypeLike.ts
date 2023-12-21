// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'
import type { ReactNode, ReactPortal } from 'react'

import type { IntrinsicElementLike } from '~/Stylable'

export type ReactElementLike<P = any> = {
	type: any
	props: P
	key: any
}

export type FunctionComponentLike<P = any> = {
	(props: any): ReactNodeLike<P> // ReactElementLike<P> | null
}

export type ReactNodeLike<P = any> =
	| PromiseLike<ReactNodeLike> // react/experimental
	| ReactElementLike<P>
	| string
	| number
	| Iterable<ReactNode>
	| ReactPortal
	| boolean
	| null
	| undefined
// | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES[keyof DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES];

$Assert.is<ReactNode, ReactNodeLike>()

export type ComponentLike<P = any> = {
	render(): any
	readonly props: Readonly<P>
}

export type ComponentClassLike<P = any> = {
	new (props: P, context?: any): ComponentLike<P>
}

export type ElementTypeLike =
	| IntrinsicElementLike
	| ComponentClassLike
	| FunctionComponentLike
