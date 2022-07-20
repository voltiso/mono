// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { VPartial } from '@voltiso/util'

import type { Props } from '../../react-types'
import type { IStylable } from '../../Stylable'
import type { IStack } from '../../Styled/_/Stack'
import type { CssProps } from '../CssProps'

export interface StyledData<P extends Props, C extends IStylable | null> {
	element: C

	stack: IStack // not Stack<P> - outer props `P` are not necessarily supertype

	defaults: VPartial<P>
	domDefaults: VPartial<P>

	cssProps: CssProps<P>
}
