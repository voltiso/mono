// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { PickCallNoUnknown, PickConstructNoUnknown } from '@voltiso/util'
import type { ComponentPropsWithRef } from 'react'

import type { StyledComponent } from '~'
import type { MergeProps, MergeProps_, Props } from '~/react-types'
import type { InnerProps } from '~/Stylable'
import type { StylableIntrinsic } from '~/Stylable/_/StylableIntrinsic'
import type { StylableJsxCall_Infer } from '~/Stylable/_/StylableJsxCall'
import type { StylableJsxConstruct_Infer } from '~/Stylable/_/StylableJsxConstruct'
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

export interface StyledHocCall<P extends Props> {
	/** Style the already styled (identity function in this case) */
	<P extends Props>(alreadyStyled: StyledComponent<P>): StyledComponent<P>

	/** Style a FC-like (callable) component */
	<PP extends InnerProps>(
		stylableFunctionComponent: PickCallNoUnknown<StylableJsxCall_Infer<PP>>,
	): StyledComponent<MergeProps<PP, P>>

	/** Style a class-like (newable) component */
	<PP extends InnerProps>(
		stylableClassComponent: PickConstructNoUnknown<
			StylableJsxConstruct_Infer<PP>
		>,
	): StyledComponent<MergeProps<PP, P>>

	/** Style an intrinsic element ('div', 'button', ...) */
	<S extends StylableIntrinsic>(stylableIntrinsicElement: S): StyledComponent<
		MergeProps_<ComponentPropsWithRef<S>, P>
	>

	/** All overloads combined (for usage in generic contexts) */
	<PP extends InnerProps, S extends StylableIntrinsic>(
		stylable:
			| S
			| PickCallNoUnknown<StylableJsxCall_Infer<PP>>
			| PickConstructNoUnknown<StylableJsxConstruct_Infer<PP>>,
	): StylableIntrinsic extends S
		? StyledComponent<MergeProps<PP, P>>
		: StyledComponent<MergeProps_<ComponentPropsWithRef<S>, P>>
}
