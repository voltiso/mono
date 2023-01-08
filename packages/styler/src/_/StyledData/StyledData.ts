// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CssProps } from '~/_/CssProps/CssProps'
import type { Css } from '~/Css'
import type { IStack } from '~/Styled/_/Stack'
import type { StyledTypeInfo } from '~/StyledTypeInfo'

export interface StyledData<
	$ extends StyledTypeInfo = StyledTypeInfo,
	CustomCss extends object = Css,
> {
	component: $['Component']

	stack: IStack // not Stack<P> - outer props `P` are not necessarily supertype

	defaults: Partial<$['Props']>
	domDefaults: Partial<$['Props']>

	cssProps: CssProps<$['Props'], CustomCss>

	_currentCss?: object
}
