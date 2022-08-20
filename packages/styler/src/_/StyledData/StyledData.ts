// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CssProps } from '~/_/CssProps/CssProps'
import type { Props } from '~/react-types'
import type { StylableLike } from '~/Stylable'
import type { IStack } from '~/Styled/_/Stack'

export interface StyledData<P extends Props, C extends StylableLike | null> {
	element: C

	stack: IStack // not Stack<P> - outer props `P` are not necessarily supertype

	defaults: Partial<P>
	domDefaults: Partial<P>

	cssProps: CssProps<P>
}
