// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ComponentPropsWithRef, ComponentType, LegacyRef } from 'react'
import type React from 'react'

import type { IntrinsicElement } from '~/Stylable'
import type { NativeElement } from '~/StyledComponent'

/** Get native element from intrinsic element or component */
export type GetNativeElement<
	T extends
		| IntrinsicElement
		| ComponentType<any>
		| React.Component<any, any, any>
		| NativeElement,
> = T extends React.Component<any, any, any> | NativeElement
	? T
	: T extends IntrinsicElement | ComponentType<any>
		? 'ref' extends keyof ComponentPropsWithRef<T>
			? // eslint-disable-next-line @typescript-eslint/no-deprecated
				ComponentPropsWithRef<T>['ref'] extends LegacyRef<infer R> | undefined
				? R
				: never
			: never
		: never

// type A = GetNativeElement<typeof View>
