// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { LegacyRef } from 'react'

import type { IntrinsicElement, NativeElement } from '~'

/** Get native element from intrinsic element */
export type GetNativeElement<T extends NativeElement | IntrinsicElement> =
	T extends NativeElement
		? T
		: T extends IntrinsicElement
		? 'ref' extends keyof JSX.IntrinsicElements[T]
			? JSX.IntrinsicElements[T]['ref'] extends LegacyRef<infer R> | undefined
				? R
				: never
			: never
		: never
