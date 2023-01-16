// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $Override_ } from '@voltiso/util'

import type { STYLED_TYPE_INFO as $ } from '~/_/symbols'
import type { StylableLike } from '~/Stylable'
import type { StyledTypeInfo } from '~/StyledTypeInfo'

export type StyledLike<$ extends Partial<StyledTypeInfo> = {}> = StyledLikeImpl<
	$Override_<{ Component: StylableLike | null; Props: {}; CustomCss: {} }, $>
>

export interface StyledLikeImpl<$ extends StyledTypeInfo> {
	readonly [$]: $
}
