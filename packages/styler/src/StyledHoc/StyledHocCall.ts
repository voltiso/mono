// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _ } from '@voltiso/util'
import type { ExoticComponent } from 'react'

import type { ComponentClassLike, FunctionComponentLike } from '~/react-types'
import type { StylableIntrinsic } from '~/Stylable'
import type { StyledLike } from '~/Styled'
import type { GetStyledComponentImpl } from '~/StyledComponent'
import type { StyledTypeInfo } from '~/StyledTypeInfo'

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
