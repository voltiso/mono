// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Throw } from '@voltiso/util'

import type {
	InnerProps,
	IsReactNative,
	StylableLike,
	StyledComponent,
} from '~'
import type {
	ComponentClassLike,
	ComponentProps_,
	FunctionComponentLike,
	Props,
} from '~/react-types'
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

export type GetStyledComponent<P, C> = C extends StylableLike
	? keyof InnerProps extends keyof ComponentProps_<C>
		? StyledComponent<P, C>
		: ThrowMissingRequiredInnerProps<ComponentProps_<C>>
	: ThrowMissingRequiredInnerProps<ComponentProps_<C>>

export interface StyledHocCall<P extends Props> {
	//

	/**
	 * Style the already styled (identity function in this case)
	 *
	 * ! TODO: merge styles/props in both runtime and typings
	 */
	<PP extends Props, C extends StylableLike>(
		alreadyStyled: StyledComponent<PP, C>,
	): StyledComponent<PP, C>

	//

	/** Style a FC-like (callable) component */
	<C extends FunctionComponentLike>(
		stylableFunctionComponent: C,
	): GetStyledComponent<P, C>
	// <C extends IStylableJsxCall>(
	// 	stylableFunctionComponent: C,
	// ): GetStyledComponent<P, C>

	//

	/** Style a class-like (newable) component */
	<C extends ComponentClassLike>(stylableClassComponent: C): GetStyledComponent<
		P,
		C
	>
	// <PP extends InnerProps>(
	// 	stylableClassComponent: PickConstructNoUnknown<
	// 		StylableJsxConstructInfer<PP>
	// 	>,
	// ): StyledComponent<MergeProps<PP, P>>

	//

	/** Style an intrinsic element ('div', 'button', ...) */
	<C extends keyof JSX.IntrinsicElements>(
		stylableIntrinsicElement: C,
	): GetStyledComponent<P, C>
	// <S extends StylableIntrinsic>(stylableIntrinsicElement: S): StyledComponent<
	// 	MergeProps_<ComponentPropsWithRef_<S>, P>
	// >

	//

	//

	/** All overloads combined (for usage in generic contexts) */
	<
		C extends
			| FunctionComponentLike
			| ComponentClassLike
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
	// 	: StyledComponent<MergeProps_<ComponentPropsWithRef_<S>, P>>
}
