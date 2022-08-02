// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IStylable } from '~/Stylable'
import type { IStyled } from '~/Styled'
import type { IStyledComponent } from '~/StyledComponent'

import type { ThrowWrongInnerProps } from './ThrowWrongInnerProps'

/**
 * Curried `Element => StyledComponent`
 *
 * - I.e. Element not provided yet
 */
export interface IStyledHoc extends IStyled, IStyledHocCall {}

//

export interface IStyledHocCall {
	<E extends IStylable>(Element: E): E extends IStyledHoc
		? E
		: IStyledComponent | ThrowWrongInnerProps
}
