// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BivariantCallable } from '@voltiso/util'
import type * as React from 'react'

import type { Css } from '~/Css'
import type { IntrinsicElement } from '~/Stylable'
import type { NativeElement } from '~/StyledComponent'

import type { IForwardedRef } from '../ForwardRefExoticComponent'
import type { GetNativeElement } from './GetNativeElement'

export type IForwardRefAndCssRenderFunction = BivariantCallable<
	(
		props: {},
		ref: IForwardedRef | undefined,
		css: readonly Css[],
	) => React.ReactElement // | null
> & { displayName?: string | undefined }

export type ForwardRefAndCssRenderFunction<
	T extends
		| IntrinsicElement
		| React.ComponentType<any>
		| React.Component<any, any, any>
		| NativeElement,
	TCss = Css,
	P = {},
	// T extends NativeElement
	// 	? {}
	// 	: T extends IntrinsicElement
	// 		? Omit<JSX.IntrinsicElements[T], 'ref' | 'css'>
	// 		: T extends React.ComponentType<any>
	// 			? Omit<$ComponentProps<T>, 'ref' | 'css'>
	// 			: never,
> = (
	props: Omit<
		P &
			(T extends IntrinsicElement | React.ComponentType<any>
				? React.ComponentProps<T>
				: T extends React.Component<infer P, any, any>
					? P
					: {}),
		'ref'
	>,
	ref: React.ForwardedRef<GetNativeElement<T>>,
	css: readonly TCss[],
) => React.ReactElement // | null
