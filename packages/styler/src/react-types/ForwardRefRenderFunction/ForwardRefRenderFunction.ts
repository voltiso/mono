// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as React from 'react'

import type { IntrinsicElement } from '~/Stylable'
import type { NativeElement } from '~/StyledComponent'

import type { GetNativeElement } from './GetNativeElement'

export type ForwardRefRenderFunction<
	T extends
		| IntrinsicElement
		| React.ComponentType<any>
		| React.Component<any, any, any>
		| NativeElement,
	P = {},
	// T extends NativeElement
	// 	? // eslint-disable-next-line @typescript-eslint/no-empty-object-type
	// 		{}
	// 	: T extends IntrinsicElement
	// 		? JSX.IntrinsicElements[T]
	// 		: T extends React.ComponentType<any> ? React.ComponentProps<T> : never,
> = React.ForwardRefRenderFunction<
	GetNativeElement<T>,
	Omit<
		P &
			(T extends IntrinsicElement | React.ComponentType<any>
				? React.ComponentProps<T>
				: T extends React.Component<infer P, any, any>
					? P
					: {}),
		'ref'
	>
	// Omit<P, 'ref'>
> // Bivariant ?

// type A = View extends NativeElement ? 1 : 0
