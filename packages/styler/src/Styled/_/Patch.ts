// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Merge2, Throw } from '@voltiso/util'

import type { GetStyled, StyledLike, StyledTypeInfo } from '~'
import type { STYLED_TYPE_INFO as TI } from '~/_/symbols'
import type {
	ComponentPropsWithoutRef_,
	ElementTypeLike,
	MergeProps_,
} from '~/react-types'

import type { OmitProps_ } from './OmitProps'

export type GetComponentProps_<C> = C extends null
	? {}
	: C extends ElementTypeLike
	? ComponentPropsWithoutRef_<C>
	: never

// export type GetComponentProps<C extends ElementType | null> =
// 	GetComponentProps_<C>

//

export type Patch<
	This extends StyledLike,
	$ extends Partial<StyledTypeInfo>,
> = PatchImpl<This, Merge2<This[TI], Required<$>>>

export type PatchImpl<This extends StyledLike, $ extends StyledTypeInfo> = (
	| keyof This[TI]['Props']
	| keyof GetComponentProps_<$['Component']>
) &
	keyof $['Props'] extends never
	? ForcePatchImpl<This, $>
	: Throw<
			'Props already exist' & {
				duplicateProps: (
					| keyof This[TI]['Props']
					| keyof GetComponentProps_<$['Component']>
				) &
					keyof $['Props']
			}
	  >

//

export type ForcePatch<
	This extends StyledLike,
	$ extends Partial<StyledTypeInfo>,
> = ForcePatchImpl<This, Merge2<This[TI], Required<$>>>

export type ForcePatchImpl<
	This extends StyledLike,
	$ extends StyledTypeInfo,
> = GetStyled<{
	Component: $['Component']
	Props: MergeProps_<This[TI]['Props'], $['Props']>
	CustomCss: MergeProps_<This[TI]['CustomCss'], $['CustomCss']>
}>

//

export type PatchRemoveProps<This extends StyledLike, PropName> = GetStyled<{
	Component: This[TI]['Component']
	Props: OmitProps_<This[TI]['Props'], PropName>
	CustomCss: This[TI]['CustomCss']
}>
