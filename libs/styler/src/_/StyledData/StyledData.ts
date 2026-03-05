// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CssProps } from '~/_/CssProps/CssProps'
import type { Css } from '~/Css'
import type { IStack } from '~/Styled/_/Stack'
import type { StyledTypeInfo } from '~/StyledTypeInfo'

import type { Unit } from './IStyledData'

export interface StyledData<
	$ extends StyledTypeInfo = StyledTypeInfo,
	CustomCss extends object = Css,
> {
	component: $['Component']

	/** Not Stack<P> - outer props `P` are not necessarily supertype */
	stack: IStack

	defaults: Partial<$['Props']>
	domDefaults: Partial<$['Props']>

	cssProps: CssProps<$['Props'], CustomCss>

	unit: Unit

	_currentCss?: object
}
