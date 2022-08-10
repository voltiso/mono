// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Throw } from '@voltiso/util'
import type { Component, ComponentProps, FunctionComponent } from 'react'

import type {
	InnerProps,
	IsReactNative,
	IStylable,
	IStylableIntrinsic,
	StyledComponent,
} from '~'
import type { Props } from '~/react-types'
import type { Styled_ } from '~/Styled'

/**
 * Curried: `Element => StyledComponent`
 *
 * - I.e. Element not provided yet
 */
interface StyledHoc<P extends Props>
	extends Styled_<P, null>,
		StyledHocCall<P> {}

export type { StyledHoc as StyledHoc_ }

//

export type ThrowMissingRequiredInnerProps<P> = IsReactNative extends true
	? Throw<'props should include `style` - instead got:' & P>
	: Throw<'props should include `className` - instead got:' & P>

export type GetStyledComponent<
	P,
	C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>,
> = C extends IStylable
	? keyof InnerProps extends keyof ComponentProps<C>
		? StyledComponent<P, C>
		: ThrowMissingRequiredInnerProps<ComponentProps<C>>
	: ThrowMissingRequiredInnerProps<ComponentProps<C>>

export interface StyledHocCall<P extends Props> {
	//

	/**
	 * Style the already styled (identity function in this case)
	 *
	 * ! TODO: merge styles/props in both runtime and typings
	 */
	<PP extends Props, C extends IStylable>(
		alreadyStyled: StyledComponent<PP, C>,
	): StyledComponent<PP, C>

	//

	/** Style a FC-like (callable) component */
	<C extends FunctionComponent<any>>(
		stylableFunctionComponent: C,
	): GetStyledComponent<P, C>
	// <C extends IStylableJsxCall>(
	// 	stylableFunctionComponent: C,
	// ): GetStyledComponent<P, C>

	//

	/** Style a class-like (newable) component */
	<C extends new (props: any) => Component<any, any>>(
		stylableClassComponent: C,
	): GetStyledComponent<P, C>
	// <PP extends InnerProps>(
	// 	stylableClassComponent: PickConstructNoUnknown<
	// 		StylableJsxConstructInfer<PP>
	// 	>,
	// ): StyledComponent<MergeProps<PP, P>>

	//

	/** Style an intrinsic element ('div', 'button', ...) */
	<C extends IStylableIntrinsic>(
		stylableIntrinsicElement: C,
	): GetStyledComponent<P, C>
	// <S extends StylableIntrinsic>(stylableIntrinsicElement: S): StyledComponent<
	// 	MergeProps_<ComponentPropsWithRef<S>, P>
	// >

	//

	//

	/** All overloads combined (for usage in generic contexts) */
	<
		C extends
			| FunctionComponent<any>
			| (new (props: any) => Component<any, any>)
			| keyof JSX.IntrinsicElements,
	>(
		stylable: C,
	): GetStyledComponent<P, C>
	// <PP extends InnerProps, S extends StylableIntrinsic>(
	// 	stylable:
	// 		| S
	// 		| PickCallNoUnknown<StylableJsxCallInfer<PP>>
	// 		| PickConstructNoUnknown<StylableJsxConstructInfer<PP>>,
	// ): StylableIntrinsic extends S
	// 	? StyledComponent<MergeProps<PP, P>>
	// 	: StyledComponent<MergeProps_<ComponentPropsWithRef<S>, P>>
}
