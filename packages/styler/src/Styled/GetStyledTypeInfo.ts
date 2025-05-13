// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $Override_ } from '@voltiso/util'

import type { Css, CustomCss } from '~/Css'
import type { RelaxedCustomCss } from '~/Css/RelaxedCss'
import type { Stylable, StylableLike } from '~/Stylable'
import type { StyledTypeInfo } from '~/StyledTypeInfo'

export type GetStyledTypeInfo<$ extends Partial<StyledTypeInfo>> = $Override_<
	{ Component: Stylable | null; Props: {}; CustomCss: {} },
	$
>

export type GetStyledLikeTypeInfo<$ extends Partial<StyledTypeInfo>> =
	$Override_<{ Component: StylableLike | null; Props: {}; CustomCss: {} }, $>

export type GetStyledCss<$ extends Partial<StyledTypeInfo>> =
	$['CustomCss'] extends {} ? CustomCss<$['CustomCss']> : Css

export type GetStyledRelaxedCss<$ extends Partial<StyledTypeInfo>> =
	$['CustomCss'] extends {}
		? RelaxedCustomCss<$['CustomCss']>
		: RelaxedCustomCss
