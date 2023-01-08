// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _, Merge2_ } from '@voltiso/util'

import type { Props } from '~/react-types'
import type { Styled } from '~/Styled'
import type { StyledTypeInfo } from '~/StyledTypeInfo'

import type { StyledHocCall } from './StyledHocCall'

/**
 * Curried: `Element => StyledComponent`
 *
 * - I.e. Element not provided yet
 */
export interface StyledHoc
	extends Styled<{ Component: null; Props: {}; CustomCss: {} }>,
		StyledHocCall<{ Props: {}; CustomCss: {} }> {}

/**
 * Curried: `Element => StyledComponent`
 *
 * - I.e. Element not provided yet
 */
export interface StyledHocWithProps<P extends Props>
	extends Styled<{ Props: P; Component: null; CustomCss: {} }>,
		StyledHocCall<{ Props: P; CustomCss: {} }> {}

/**
 * Curried: `Element => StyledComponent`
 *
 * - I.e. Element not provided yet
 */
export interface CustomStyledHoc<
	$ extends Partial<Pick<StyledTypeInfo, 'Props' | 'CustomCss'>>,
> extends CustomStyledHocImpl<
		Merge2_<{ Props: {}; CustomCss: {} }, Required<$>>
	> {}

/**
 * Curried: `Element => StyledComponent`
 *
 * - I.e. Element not provided yet
 */
export interface CustomStyledHocImpl<
	$ extends Pick<StyledTypeInfo, 'Props' | 'CustomCss'>,
> extends Styled<_<{ Component: null } & $>>,
		StyledHocCall<$> {}
