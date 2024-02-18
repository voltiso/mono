// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ComponentType } from 'react'

import type { IntrinsicElement } from '~/Stylable'
import type { NativeElement } from '~/StyledComponent'

import type { GetNativeElement } from './GetNativeElement'

export type ForwardRefRenderFunction<
	T extends NativeElement | IntrinsicElement | ComponentType<any>,
	P = T extends NativeElement
		? {}
		: T extends IntrinsicElement
			? JSX.IntrinsicElements[T]
			: never,
> = React.ForwardRefRenderFunction<GetNativeElement<T>, Omit<P, 'ref'>>
