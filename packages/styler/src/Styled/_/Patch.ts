// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { GetProperty, Throw, VOmit } from '@voltiso/util'

import type { MergeProps_, Props } from '~/react-types'
import type { IStylable } from '~/Stylable'
import type { IStyled } from '~/Styled'
import type { StyledComponent } from '~/StyledComponent'
import type { StyledHoc } from '~/StyledHoc'

export type Patch<
	This extends IStyled,
	P extends Props = {},
	C extends IStylable | null = This['component'],
> = keyof GetProperty<This, '_data'>['P'] & keyof P extends never
	? ForcePatch<This, P, C>
	: Throw<
			'Error: Props already exist' & {
				duplicateProps: keyof GetProperty<This, '_data'>['P'] & keyof P
			}
	  >

export type ForcePatch<
	This extends IStyled,
	P extends Props = {},
	C extends IStylable | null = This['component'],
> = C extends null
	? StyledHoc<MergeProps_<GetProperty<This, '_data'>['P'], P>>
	: StyledComponent<MergeProps_<GetProperty<This, '_data'>['P'], P>>

//

export type PatchRemoveProps<
	This extends IStyled,
	PropName extends keyof GetProperty<This, '_data'>['P'],
	C extends IStylable | null = This['component'],
> = C extends null
	? StyledHoc<VOmit<GetProperty<This, '_data'>['P'], PropName>>
	: StyledComponent<VOmit<GetProperty<This, '_data'>['P'], PropName>>
