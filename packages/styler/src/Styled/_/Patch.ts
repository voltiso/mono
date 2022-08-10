// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Throw } from '@voltiso/util'
import type { ComponentPropsWithoutRef, ElementType } from 'react'

import type { STYLED_TYPE_INFO } from '~/_/symbols'
import type { MergeProps_ } from '~/react-types'
import type { IStylable } from '~/Stylable'
import type { StyledComponent } from '~/StyledComponent'
import type { StyledHoc } from '~/StyledHoc'

import type { OmitProps_ } from './OmitProps'

export type GetComponentProps_<C> = C extends null
	? {}
	: C extends ElementType
	? ComponentPropsWithoutRef<C>
	: never

// export type GetComponentProps<C extends ElementType | null> =
// 	GetComponentProps_<C>

//

type StyledLike = {
	readonly component: any
	readonly [STYLED_TYPE_INFO]: { P: any }
}

export type Patch_<This extends StyledLike, P = {}, C = This['component']> = (
	| keyof This[STYLED_TYPE_INFO]['P']
	| keyof GetComponentProps_<C>
) &
	keyof P extends never
	? ForcePatch_<This, P, C>
	: Throw<
			'Error: Props already exist' & {
				duplicateProps: keyof This[STYLED_TYPE_INFO]['P'] & keyof P
			}
	  >

// export type Patch<
// 	This extends IStyled,
// 	P extends Props = {},
// 	C extends IStylable | null = This['component'],
// > = Patch_<This, P, C>

//

export type ForcePatch_<
	This extends StyledLike,
	P = {},
	C = This['component'],
> = C extends null
	? StyledHoc<MergeProps_<This[STYLED_TYPE_INFO]['P'], P>>
	: C extends IStylable
	? StyledComponent<MergeProps_<This[STYLED_TYPE_INFO]['P'], P>, C>
	: never

// export type ForcePatch<
// 	This extends IStyled,
// 	P extends Props = {},
// 	C extends IStylable | null = This['component'],
// > = ForcePatch_<This, P, C>

//

export type PatchRemoveProps_<
	This extends StyledLike,
	PropName,
	C = This['component'],
> = C extends null
	? StyledHoc<OmitProps_<This[STYLED_TYPE_INFO]['P'], PropName>>
	: C extends IStylable
	? StyledComponent<OmitProps_<This[STYLED_TYPE_INFO]['P'], PropName>, C>
	: never

// export type PatchRemoveProps<
// 	This extends StyledLike & { component: IStylable | null },
// 	PropName extends keyof GetProperty_<This, '_data'>['P'],
// 	C extends IStylable | null = This['component'],
// > = PatchRemoveProps_<This, PropName, C>
