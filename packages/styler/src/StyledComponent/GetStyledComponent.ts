// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Merge2, Throw } from '@voltiso/util'

import type {
	CustomStyledComponent,
	CustomStyledHoc,
	InnerProps,
	IsReactNative,
	IStylable,
	StylableLike,
	StyledHoc,
	StyledHocWithProps,
	StyledTypeInfo,
} from '~'
import type { ComponentProps_, Props } from '~/react-types'

import type { StyledComponent } from './StyledComponent'
import type { StyledComponentWithProps } from './StyledComponentWithProps'

export type GetStyledComponentNoCustomCss<
	C extends StylableLike,
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

/** With Element already provided */
export type GetStyledComponentImpl<
	$ extends StyledTypeInfo & { Component: StylableLike },
> = keyof InnerProps extends keyof ComponentProps_<$['Component']>
	? keyof $['CustomCss'] extends never
		? GetStyledComponentNoCustomCss<$['Component'], $['Props']>
		: CustomStyledComponent<
				$['Component'],
				{ Props: $['Props']; CustomCss: $['CustomCss'] }
		  >
	: ThrowMissingRequiredInnerProps<ComponentProps_<$['Component']>>

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
	: $ extends { Component: StylableLike }
	? GetStyledComponentImpl<$>
	: never
