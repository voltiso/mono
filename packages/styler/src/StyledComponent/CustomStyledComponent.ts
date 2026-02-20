// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _ } from '@voltiso/util'
import type { ForwardRefExoticComponent } from 'react'

import type {
	ComponentPropsWithRef_,
	FastMergeProps_,
	Props,
} from '~/react-types'
import type { StyledSubject, StyledTypeInfo } from '~/StyledTypeInfo'

import type { Styled, StyledLike } from '../Styled'
import type { StyledComponentProps } from './StyledComponentWithProps'

/** With Element already provided */
export interface CustomStyledComponent<
	C extends StyledSubject,
	$ extends Pick<StyledTypeInfo, 'Props' | 'CustomCss'>,
> extends Styled<_<{ Component: C } & $>>,
		ForwardRefExoticComponent<
			StyledComponentProps<C, $['Props'], $['CustomCss']>
		> {}

//

/** With Element already provided */
export interface StyledComponentLike<
	C extends StyledSubject,
	P extends Props = {},
> extends StyledLike<{ Component: C; Props: P; CustomCss: {} }>,
		ForwardRefExoticComponent<
			FastMergeProps_<
				ComponentPropsWithRef_<C>,
				P & { css?: object | undefined }
			>
		> {}
