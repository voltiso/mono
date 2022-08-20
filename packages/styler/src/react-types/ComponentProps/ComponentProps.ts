// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { PropsWithoutRef, PropsWithRef, RefAttributes } from 'react'

import type { ComponentLike, ReactElementLike } from '../ElementType'

export type JSXElementConstructorLike<P> =
	| ((props: P) => ReactElementLike | null)
	| (new (props: P) => ComponentLike)

export type ComponentProps_<T> = T extends JSXElementConstructorLike<infer P>
	? P
	: T extends keyof JSX.IntrinsicElements
	? JSX.IntrinsicElements[T]
	: {}

export type ComponentPropsWithRef_<T> = T extends new (
	props: infer P,
) => ComponentLike
	? PropsWithoutRef<P> & RefAttributes<InstanceType<T>>
	: PropsWithRef<ComponentProps_<T>>

export type ComponentPropsWithoutRef_<T> = PropsWithoutRef<ComponentProps_<T>>
