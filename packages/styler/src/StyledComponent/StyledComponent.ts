// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ForwardRefExoticComponent } from 'react'

import type {
	ComponentPropsWithRef_,
	FastMergeProps_,
	Props,
} from '~/react-types'
import type { OuterProps, StylableLike } from '~/Stylable'
import type { Styled_ } from '~/Styled'

export type StyledComponentProps<
	P extends Props,
	C extends StylableLike,
> = FastMergeProps_<ComponentPropsWithRef_<C>, P & OuterProps>

/** With Element already provided */
interface StyledComponent<P extends Props, C extends StylableLike>
	extends Styled_<P, C>,
		ForwardRefExoticComponent<StyledComponentProps<P, C>> {}

export type { StyledComponent as StyledComponent_ }
