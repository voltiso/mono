// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $Merge2_, Merge2_, Throw } from '@voltiso/util'

import type { STYLED_TYPE_INFO as TI } from '~/_/symbols'
import type { ComponentPropsWithoutRef_, MergeProps_ } from '~/react-types'
import type { StylableLike } from '~/Stylable'
import type { StyledLike } from '~/Styled'
import type { GetStyledImplN } from '~/StyledComponent'
import type { StyledTypeInfo } from '~/StyledTypeInfo'

import type { OmitProps_ } from './OmitProps'

export type GetComponentProps_<C> = C extends null
	? {}
	: C extends StylableLike
	? ComponentPropsWithoutRef_<C>
	: {}

//

export type Patch<
	This extends StyledLike,
	$ extends Partial<StyledTypeInfo>,
> = PatchImpl<
	This,
	$Merge2_<
		{ Component: This[TI]['Component']; Props: {}; CustomCss: {} },
		Required<$>
	>
>

export type GetDuplicateCustomCss<
	This extends StyledLike,
	$ extends StyledTypeInfo,
> = keyof $['CustomCss'] & keyof This[TI]['CustomCss']

export type GetDuplicateProps<
	This extends StyledLike,
	$ extends StyledTypeInfo,
> = (keyof This[TI]['Props'] | keyof GetComponentProps_<$['Component']>) &
	keyof $['Props']

export type PatchImpl<
	This extends StyledLike,
	$ extends StyledTypeInfo,
> = GetDuplicateCustomCss<This, $> extends never
	? GetDuplicateProps<This, $> extends never
		? ForcePatchImpl<This, $>
		: Throw<
				'Props already exist' & { duplicateProps: GetDuplicateProps<This, $> }
		  >
	: Throw<
			'CustomCss already exists' & {
				duplicateCustomCss: GetDuplicateCustomCss<This, $>
			}
	  >

//

export type ForcePatch<
	This extends StyledLike,
	$ extends Partial<StyledTypeInfo>,
> = ForcePatchImpl<
	This,
	Merge2_<
		{ Component: This[TI]['Component']; Props: {}; CustomCss: {} },
		Required<$>
	>
>

export type ForcePatchImpl<
	This extends StyledLike,
	$ extends StyledTypeInfo,
> = GetStyledImplN<
	$['Component'],
	MergeProps_<This[TI]['Props'], $['Props']>,
	MergeProps_<This[TI]['CustomCss'], $['CustomCss']>
>

//

export type PatchRemoveProps<
	This extends StyledLike,
	PropName,
> = GetStyledImplN<
	This[TI]['Component'],
	OmitProps_<This[TI]['Props'], PropName>,
	This[TI]['CustomCss']
>
