// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Merge2, Throw } from '@voltiso/util'
import type { ForwardRefRenderFunction } from 'react'
import type { NativeMethods } from 'react-native'

import type { IsReactNative } from '~/IsReactNative'
import type {
	$ComponentProps,
	ForwardRefAndCssRenderFunction,
	Props,
} from '~/react-types'
import type { InnerProps, IStylable, StylableLike } from '~/Stylable'
import type {
	CustomStyledHoc,
	StyledHoc,
	StyledHocWithProps,
} from '~/StyledHoc'
import type { StyledTypeInfo } from '~/StyledTypeInfo'

import type { CustomStyledComponent } from './CustomStyledComponent'
import type { StyledComponent } from './StyledComponent'
import type { StyledComponentWithProps } from './StyledComponentWithProps'

export type GetStyledComponentNoCustomCss<
	C extends StylableLike | NativeElement,
	P extends Props,
> = keyof P extends never ? StyledComponent<C> : StyledComponentWithProps<C, P>

export type ThrowMissingRequiredInnerProps<P> = IsReactNative extends true
	? Throw<'props should include `style` - instead got:' & P>
	: Throw<'props should include `className` - instead got:' & P>

//

//

export type GetStyledComponent<$ extends Partial<StyledTypeInfo>> = Exclude<
	keyof $,
	keyof StyledTypeInfo
> extends never
	? GetStyledComponentImpl<
			Merge2<{ Component: IStylable; Props: {}; CustomCss: {} }, Required<$>>
	  >
	: Throw<
			'unknown type parameters' & {
				Parameters: Exclude<keyof $, keyof StyledTypeInfo>
			}
	  >

/**
 * If user code does not include `DOM` lib, `HTMLElement` may be an empty
 * interface - intersect with `object` so that `string` is not assignable to it
 */
export type NativeElement = IsReactNative extends true
	? object & NativeMethods
	: IsReactNative extends false
	? object & HTMLElement
	: never

export type IsStylable_<C> = keyof InnerProps extends keyof $ComponentProps<C>
	? true
	: false

export type $IsStylableForwardRef_<C> = C extends ForwardRefRenderFunction<
	any,
	infer P
>
	? keyof InnerProps extends keyof P
		? true
		: false
	: false

export type $IsStylableForwardRefAndCss_<C> =
	C extends ForwardRefAndCssRenderFunction<any, any, infer P>
		? keyof InnerProps extends keyof P
			? true
			: false
		: false

export type $IsStylable_<C> = C extends any ? IsStylable_<C> : never

export type $IsStylableComponentOrForwardRefOrNativeElement_<X> =
	X extends NativeElement
		? true
		: $IsStylableForwardRef_<X> extends true
		? true
		: $IsStylableForwardRefAndCss_<X> extends true
		? true
		: IsStylable_<X> extends true
		? true
		: false

/** With Element already provided */
export type GetStyledComponentImpl<
	$ extends StyledTypeInfo & { Component: StylableLike | NativeElement },
	Component extends StylableLike | NativeElement = $['Component'],
> = Component extends any
	? $IsStylableComponentOrForwardRefOrNativeElement_<Component> extends true
		? keyof $['CustomCss'] extends never
			? GetStyledComponentNoCustomCss<$['Component'], $['Props']>
			: CustomStyledComponent<
					$['Component'],
					{ Props: $['Props']; CustomCss: $['CustomCss'] }
			  >
		: $IsStylableComponentOrForwardRefOrNativeElement_<Component> extends false
		? ThrowMissingRequiredInnerProps<$ComponentProps<$['Component']>>
		: never
	: never

//

export type GetStyledHoc<
	$ extends Partial<Pick<StyledTypeInfo, 'Props' | 'CustomCss'>>,
> = Exclude<keyof $, keyof StyledTypeInfo> extends never
	? GetStyledHocImpl<Merge2<{ Props: {}; CustomCss: {} }, Required<$>>>
	: Throw<
			'unknown type parameters' & {
				Parameters: Exclude<keyof $, keyof StyledTypeInfo>
			}
	  >

export type GetStyledHocImpl<
	$ extends Pick<StyledTypeInfo, 'Props' | 'CustomCss'>,
> = keyof $['CustomCss'] extends never
	? keyof $['Props'] extends never
		? StyledHoc
		: StyledHocWithProps<$['Props']>
	: keyof $['Props'] extends never
	? CustomStyledHoc<{ CustomCss: $['CustomCss'] }>
	: CustomStyledHoc<{ Props: $['Props']; CustomCss: $['CustomCss'] }>

//

export type GetStyled<$ extends Partial<StyledTypeInfo>> = Exclude<
	keyof $,
	keyof StyledTypeInfo
> extends never
	? GetStyledImpl<
			Merge2<{ Component: null; Props: {}; CustomCss: {} }, Required<$>>
	  >
	: Throw<
			'unknown type parameters' & {
				Parameters: Exclude<keyof $, keyof StyledTypeInfo>
			}
	  >

export type GetStyledImpl<$ extends StyledTypeInfo> = $ extends {
	Component: null
}
	? GetStyledHocImpl<$>
	: $ extends { Component: StylableLike | NativeElement }
	? GetStyledComponentImpl<$>
	: never

export type GetStyledImplN<
	C extends StylableLike | NativeElement | null,
	P extends {},
	CC extends {},
> = GetStyledImpl<{ Component: C; Props: P; CustomCss: CC }>
