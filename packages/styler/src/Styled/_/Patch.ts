// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { GetProperty, Throw } from '@voltiso/util'
import type { ComponentPropsWithoutRef, ElementType } from 'react'

import type { MergeProps_, Props } from '~/react-types'
import type { IStylable } from '~/Stylable'
import type { IStyled } from '~/Styled'
import type { StyledComponent } from '~/StyledComponent'
import type { StyledHoc } from '~/StyledHoc'
import type { OmitProps } from './OmitProps'

export type GetComponentProps<C extends ElementType | null> = C extends null
	? {}
	: C extends ElementType
	? ComponentPropsWithoutRef<C>
	: never

export type Patch<
	This extends IStyled,
	P extends Props = {},
	C extends IStylable | null = This['component'],
> = (keyof GetProperty<This, '_data'>['P'] | keyof GetComponentProps<C>) &
	keyof P extends never
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
	: C extends IStylable
	? StyledComponent<MergeProps_<GetProperty<This, '_data'>['P'], P>, C>
	: never

//

export type PatchRemoveProps<
	This extends IStyled,
	PropName extends keyof GetProperty<This, '_data'>['P'],
	C extends IStylable | null = This['component'],
> = C extends null
	? StyledHoc<OmitProps<GetProperty<This, '_data'>['P'], PropName>>
	: C extends IStylable
	? StyledComponent<OmitProps<GetProperty<This, '_data'>['P'], PropName>, C>
	: never
