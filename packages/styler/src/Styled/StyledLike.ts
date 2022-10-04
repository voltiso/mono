// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Merge2 } from '@voltiso/util'

import type { STYLED_TYPE_INFO as $ } from '~/_/symbols'
import type { StylableLike } from '~/Stylable'
import type { StyledTypeInfo } from '~/StyledTypeInfo'

export type StyledLike<$ extends Partial<StyledTypeInfo> = {}> = StyledLikeImpl<
	Merge2<
		{ Component: StylableLike | null; Props: {}; CustomCss: {} },
		Required<$>
	>
>

export interface StyledLikeImpl<$ extends StyledTypeInfo> {
	readonly [$]: $
}
