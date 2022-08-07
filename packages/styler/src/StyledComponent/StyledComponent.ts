// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ForwardRefExoticComponent } from 'react'

import type { MergeProps, Props } from '~/react-types'
import type { IStylable, OuterProps } from '~/Stylable'
import type { Styled_ } from '~/Styled'

export type StyledComponentProps<P extends Props> = MergeProps<P, OuterProps>

/** With Element already provided */
interface StyledComponent<P extends Props>
	extends Styled_<P, IStylable>,
		ForwardRefExoticComponent<StyledComponentProps<P>> {}

export type { StyledComponent as StyledComponent_ }
