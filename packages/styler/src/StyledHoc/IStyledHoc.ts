// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { StylableLike } from '~/Stylable'
import type { IStyled, StyledLike } from '~/Styled'
import type { IStyledComponent } from '~/StyledComponent'

import type { ThrowWrongInnerProps } from './ThrowWrongInnerProps'

export interface StyledHocLike extends StyledLike, IStyledHocCall {}

/**
 * Curried `Element => StyledComponent`
 *
 * - I.e. Element not provided yet
 */
export interface IStyledHoc extends IStyled, IStyledHocCall {}

//

export interface IStyledHocCall {
	<E extends StylableLike>(
		Element: E,
	): E extends StyledHocLike ? E : IStyledComponent | ThrowWrongInnerProps
}
