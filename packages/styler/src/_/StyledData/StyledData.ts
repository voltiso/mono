// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Css, StyledTypeInfo } from '~'
import type { CssProps } from '~/_/CssProps/CssProps'
import type { IStack } from '~/Styled/_/Stack'

export interface StyledData<
	$ extends StyledTypeInfo = StyledTypeInfo,
	CustomCss extends object = Css,
> {
	component: $['Component']

	stack: IStack // not Stack<P> - outer props `P` are not necessarily supertype

	defaults: Partial<$['Props']>
	domDefaults: Partial<$['Props']>

	cssProps: CssProps<$['Props'], CustomCss>
}
