// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ReactNode, ReactPortal } from 'react'

import type { IntrinsicElementLike } from '~/Stylable'

export interface ReactElementLike<P = any> {
	type: any
	props: P
	key: any
}

export interface FunctionComponentLike<P = any> {
	(props: any): ReactNodeLike<P> // ReactElementLike<P> | null
}

export type ReactNodeLike<P = any> =
	| PromiseLike<ReactNodeLike> // react/experimental
	| ReactElementLike<P>
	| string
	| number
	| bigint
	| Iterable<ReactNode>
	| ReactPortal
	| boolean
	| null
	| undefined
// | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES[keyof DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES];

export interface ComponentLike<P = any> {
	render(): any
	readonly props: Readonly<P>
}

export interface ComponentClassLike<P = any> {
	new (props: P, context?: any): ComponentLike<P>
}

export type ElementTypeLike =
	| IntrinsicElementLike
	| ComponentClassLike
	| FunctionComponentLike
