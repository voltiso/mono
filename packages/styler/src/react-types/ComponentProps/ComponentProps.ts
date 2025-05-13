// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type React from 'react'

import type { NativeElement } from '~/StyledComponent'

import type { ComponentLike, ReactNodeLike } from '../ElementType'
import type { ForwardRefAndCssRenderFunction } from '../ForwardRefRenderFunction'

export type JSXElementConstructorLike<P> =
	| ((props: P) => ReactNodeLike) // ReactElementLike | null
	| (new (props: P) => ComponentLike)

export type $ComponentProps<T> =
	T extends JSXElementConstructorLike<infer P>
		? P
		: T extends React.ForwardRefRenderFunction<any, infer P>
			? P
			: T extends ForwardRefAndCssRenderFunction<any, any, infer P>
				? P
				: T extends keyof React.JSX.IntrinsicElements
					? React.JSX.IntrinsicElements[T]
					: T extends NativeElement
						? React.RefAttributes<T>
						: {}

export type ComponentPropsWithRef_<T> = T extends new (
	props: infer P,
) => ComponentLike
	? React.PropsWithoutRef<P> & React.RefAttributes<InstanceType<T>>
	: $ComponentProps<T>
// : React.PropsWithRef<$ComponentProps<T>>

export type ComponentPropsWithoutRef_<T> = React.PropsWithoutRef<
	$ComponentProps<T>
>
