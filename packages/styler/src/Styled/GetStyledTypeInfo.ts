// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Merge2 } from '@voltiso/util'

import type { Css, CustomCss } from '~/Css'
import type { Stylable, StylableLike } from '~/Stylable'
import type { StyledTypeInfo } from '~/StyledTypeInfo'

export type GetStyledTypeInfo<$ extends Partial<StyledTypeInfo>> = Merge2<
	{ Component: Stylable | null; Props: {}; CustomCss: {} },
	Required<$>
>

export type GetStyledLikeTypeInfo<$ extends Partial<StyledTypeInfo>> = Merge2<
	{ Component: StylableLike | null; Props: {}; CustomCss: {} },
	Required<$>
>

export type GetStyledCss<$ extends Partial<StyledTypeInfo>> =
	$['CustomCss'] extends {} ? CustomCss<$['CustomCss']> : Css
