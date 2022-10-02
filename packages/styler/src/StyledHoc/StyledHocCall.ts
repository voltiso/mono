// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _, BivariantCallable } from '@voltiso/util'
import type {
	ExoticComponent,
	ForwardedRef,
	ForwardRefRenderFunction,
	ReactElement,
	RefObject,
} from 'react'

import type {
	ComponentClassLike,
	Css,
	FunctionComponentLike,
	GetStyledComponentImpl,
	IForwardedRef,
	NativeElement,
	Props,
	StylableIntrinsic,
	StyledLike,
	StyledTypeInfo,
} from '~'

export type IntrinsicElementFor<E> = {
	[k in keyof JSX.IntrinsicElements]: Exclude<
		Extract<JSX.IntrinsicElements[k]['ref'], RefObject<unknown>>['current'],
		null
	> extends E
		? k
		: never
}[keyof JSX.IntrinsicElements]

export type IForwardRefAndCssRenderFunction = BivariantCallable<
	(
		props: {},
		ref: IForwardedRef | undefined,
		css: Css | Css[],
	) => ReactElement | null
> & { displayName?: string | undefined }

export interface ForwardRefAndCssRenderFunction<T, TCss = Css, P = {}> {
	(props: P, ref: ForwardedRef<T>, css: TCss): ReactElement | null
}

export interface StyledHocCall<
	$ extends Pick<StyledTypeInfo, 'Props' | 'CustomCss'>,
> {
	/**
	 * Style the already styled (identity function in this case)
	 *
	 * ! TODO: merge styles/props in both runtime and typings
	 */
	<C extends StyledLike>(alreadyStyled: C): C

	//

	// /** Forward ref */
	// <T extends ForwardRefExoticComponent<any>>(component: T): GetStyledComponentImpl

	/** Style a FC-like (callable) component */
	<C extends FunctionComponentLike | ExoticComponent<any>>(
		stylableFunctionComponent: C,
	): GetStyledComponentImpl<_<{ Component: C } & $>>

	/** Forward ref */
	<T extends NativeElement, P extends Props>(
		forwardRefRenderFunction: ForwardRefRenderFunction<T, P>,
	): GetStyledComponentImpl<
		_<
			{
				Component: T
				Props: P
			} & $
		>
	>

	/** Forward ref and css */
	<T extends NativeElement>(
		forwardRefAndCssRenderFunction: ForwardRefAndCssRenderFunction<
			T,
			$['CustomCss'],
			$['Props']
		>,
	): GetStyledComponentImpl<_<{ Component: T } & $>>

	//

	/** Style a class-like (newable) component */
	<C extends ComponentClassLike>(
		stylableClassComponent: C,
	): GetStyledComponentImpl<_<{ Component: C } & $>>

	//

	/** Style an intrinsic element ('div', 'button', ...) */
	<C extends StylableIntrinsic>(
		stylableIntrinsicElement: C,
	): GetStyledComponentImpl<_<{ Component: C } & $>>

	//

	//

	/** All overloads combined (for usage in generic contexts) */
	<C extends FunctionComponentLike | ComponentClassLike | StylableIntrinsic>(
		stylable: C,
	): GetStyledComponentImpl<_<{ Component: C } & $>>
}
