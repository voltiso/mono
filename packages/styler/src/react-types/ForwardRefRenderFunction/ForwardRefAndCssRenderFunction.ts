// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BivariantCallable } from '@voltiso/util'
import type { ForwardedRef, ReactElement } from 'react'

import type {
	ComponentProps_,
	GetNativeElement,
	IntrinsicElement,
	NativeElement,
} from '~'
import type { Css } from '~/Css'

import type { IForwardedRef } from '../ForwardRefExoticComponent'

export type IForwardRefAndCssRenderFunction = BivariantCallable<
	(
		props: {},
		ref: IForwardedRef | undefined,
		css: Css | Css[],
	) => ReactElement | null
> & { displayName?: string | undefined }

export interface ForwardRefAndCssRenderFunction<
	T extends NativeElement | IntrinsicElement,
	TCss = Css,
	P = T extends NativeElement
		? {}
		: T extends IntrinsicElement
		? ComponentProps_<T>
		: never,
> {
	(
		props: P,
		ref: ForwardedRef<GetNativeElement<T>>,
		css: TCss,
	): ReactElement | null
}
