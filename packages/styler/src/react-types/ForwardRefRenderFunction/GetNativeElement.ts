// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ComponentProps, ComponentType, LegacyRef } from 'react'

import type { IntrinsicElement } from '~/Stylable'
import type { NativeElement } from '~/StyledComponent'

/** Get native element from intrinsic element or component */
export type GetNativeElement<
	T extends NativeElement | IntrinsicElement | ComponentType<any>,
> = T extends NativeElement
	? T
	: T extends IntrinsicElement | ComponentType<any>
	? 'ref' extends keyof ComponentProps<T>
		? ComponentProps<T>['ref'] extends LegacyRef<infer R> | undefined
			? R
			: never
		: never
	: never
