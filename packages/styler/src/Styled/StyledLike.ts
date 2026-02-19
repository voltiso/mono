// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $Override_ } from '@voltiso/util'

import type { STYLED_TYPE_INFO as $ } from '~/_/symbols'
import type { StyledSubject, StyledTypeInfo } from '~/StyledTypeInfo'

export type StyledLike<$ extends Partial<StyledTypeInfo> = {}> = StyledLikeImpl<
	$Override_<{ Component: StyledSubject | null; Props: {}; CustomCss: {} }, $>
>

export interface StyledLikeImpl<$ extends StyledTypeInfo> {
	readonly [$]: $
}
