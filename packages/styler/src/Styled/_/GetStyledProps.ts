// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	ComponentPropsWithRef_,
	ElementTypeLike,
	MergeProps_,
} from '~/react-types'
import type { StyledTypeInfo } from '~/StyledTypeInfo'

import type {
	GetStyledLikeTypeInfo as GL,
	GetStyledTypeInfo as G,
} from '../GetStyledTypeInfo'

export type $GetStyledProps<$ extends Partial<StyledTypeInfo>> =
	$GetStyledPropsImpl<G<$>['Component'], G<$>['Props']>

export type $GetStyledLikeProps<$ extends Partial<StyledTypeInfo>> =
	$GetStyledPropsImpl<GL<$>['Component'], GL<$>['Props']>

/** Distribute over `P` and `C` */
export type $GetStyledPropsImpl<C, P> = C extends null
	? P
	: C extends ElementTypeLike
		? MergeProps_<ComponentPropsWithRef_<C>, P>
		: never
