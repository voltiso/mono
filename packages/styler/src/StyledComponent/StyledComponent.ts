// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OmitSignatures } from '@voltiso/util'
import type { ForwardRefExoticComponent } from 'react'

import type {
	MergeProps as MergeProperties,
	Props as Properties,
} from '~/react-types'
import type { IStylable, OuterProps as OuterProperties } from '~/Stylable'
import type { Styled_ } from '~/Styled'

/** With Element already provided */
interface StyledComponent<P extends Properties>
	extends Styled_<P, IStylable>,
		ForwardRefExoticComponent<
			MergeProperties<P, OmitSignatures<OuterProperties>>
		> {}

export type { StyledComponent as StyledComponent_ }
