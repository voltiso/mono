// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ComponentPropsWithRef, ForwardRefExoticComponent } from 'react'

import type { MergeProps_, Props } from '~/react-types'
import type { IStylable, OuterProps } from '~/Stylable'
import type { Styled_ } from '~/Styled'

export type StyledComponentProps<
	P extends Props,
	C extends IStylable,
> = MergeProps_<MergeProps_<ComponentPropsWithRef<C>, P>, OuterProps>

/** With Element already provided */
interface StyledComponent<P extends Props, C extends IStylable>
	extends Styled_<P, C>,
		ForwardRefExoticComponent<StyledComponentProps<P, C>> {}

export type { StyledComponent as StyledComponent_ }
