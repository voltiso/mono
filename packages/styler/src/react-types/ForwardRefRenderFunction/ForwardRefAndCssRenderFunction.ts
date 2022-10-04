// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BivariantCallable } from '@voltiso/util'
import type { ComponentType, ForwardedRef, ReactElement } from 'react'

import type { Css } from '~/Css'
import type { IntrinsicElement } from '~/Stylable'
import type { NativeElement } from '~/StyledComponent'

import type { $ComponentProps } from '../ComponentProps'
import type { IForwardedRef } from '../ForwardRefExoticComponent'
import type { GetNativeElement } from './GetNativeElement'

export type IForwardRefAndCssRenderFunction = BivariantCallable<
	(
		props: {},
		ref: IForwardedRef | undefined,
		css: readonly Css[],
	) => ReactElement | null
> & { displayName?: string | undefined }

export interface ForwardRefAndCssRenderFunction<
	T extends NativeElement | IntrinsicElement | ComponentType<any>,
	TCss = Css,
	P = T extends NativeElement
		? {}
		: T extends IntrinsicElement
		? Omit<JSX.IntrinsicElements[T], 'ref' | 'css'>
		: T extends ComponentType<any>
		? Omit<$ComponentProps<T>, 'ref' | 'css'>
		: never,
> {
	(
		props: P,
		ref: ForwardedRef<GetNativeElement<T>>,
		css: readonly TCss[],
	): ReactElement | null
}
