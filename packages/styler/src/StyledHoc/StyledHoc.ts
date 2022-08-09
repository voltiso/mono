// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Throw } from '@voltiso/util'
import type { ComponentProps } from 'react'

import type {
	InnerProps,
	IsReactNative,
	IStylable,
	IStylableIntrinsic,
	IStylableJsxCall,
	IStylableJsxConstruct,
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

export type ThrowMissingRequiredInnerProps<P extends Props> =
	IsReactNative extends true
		? Throw<'props should include `style`' & { Got: P }>
		: Throw<'props should include `className`' & { Got: P }>

export type GetStyledComponent<P, C extends IStylable> = Required<
	ComponentProps<C>
> extends Required<InnerProps>
	? StyledComponent<P, C>
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
	<C extends IStylableJsxCall>(
		stylableFunctionComponent: C,
	): GetStyledComponent<P, C>
	// <PP extends InnerProps>(
	// 	stylableFunctionComponent: PickCallNoUnknown<StylableJsxCallInfer<PP>>,
	// ): StyledComponent<MergeProps<PP, P>>

	//

	/** Style a class-like (newable) component */
	<C extends IStylableJsxConstruct>(
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
	<C extends IStylable>(stylable: C): GetStyledComponent<P, C>
	// <PP extends InnerProps, S extends StylableIntrinsic>(
	// 	stylable:
	// 		| S
	// 		| PickCallNoUnknown<StylableJsxCallInfer<PP>>
	// 		| PickConstructNoUnknown<StylableJsxConstructInfer<PP>>,
	// ): StylableIntrinsic extends S
	// 	? StyledComponent<MergeProps<PP, P>>
	// 	: StyledComponent<MergeProps_<ComponentPropsWithRef<S>, P>>
}
