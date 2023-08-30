// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	ForwardRefRenderFunction,
	PropsWithoutRef,
	PropsWithRef,
	RefAttributes,
} from 'react'

import type { ComponentLike, ReactNodeLike } from '../ElementType'
import type { ForwardRefAndCssRenderFunction } from '../ForwardRefRenderFunction'

export type JSXElementConstructorLike<P> =
	| ((props: P) => ReactNodeLike) // ReactElementLike | null
	| (new (props: P) => ComponentLike)

export type $ComponentProps<T> = T extends JSXElementConstructorLike<infer P>
	? P
	: T extends ForwardRefRenderFunction<any, infer P>
	? P
	: T extends ForwardRefAndCssRenderFunction<any, any, infer P>
	? P
	: T extends keyof JSX.IntrinsicElements
	? JSX.IntrinsicElements[T]
	: {}

export type ComponentPropsWithRef_<T> = T extends new (
	props: infer P,
) => ComponentLike
	? PropsWithoutRef<P> & RefAttributes<InstanceType<T>>
	: PropsWithRef<$ComponentProps<T>>

export type ComponentPropsWithoutRef_<T> = PropsWithoutRef<$ComponentProps<T>>
