// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ForwardedRef, ForwardRefRenderFunction } from 'react'
import { forwardRef } from 'react'

import type { IStylable } from '~'
import type { StyledData } from '~/_/StyledData/StyledData'
import type { OuterProps } from '~/Stylable/OuterProps'
import { getElementName } from '~/Styled/_/getElementName'

import { render } from './render'

export function getComponent<P, C extends IStylable>(data: StyledData<P, C>) {
	const name = `style(${getElementName(data.element)})`

	// eslint-disable-next-line security/detect-object-injection
	const renderFunction: ForwardRefRenderFunction<unknown, P & OuterProps> = {
		[name]: (props: P & OuterProps, ref: ForwardedRef<unknown>) =>
			render<P, C>(props, ref, data),
	}[name] as never

	renderFunction.displayName = name

	// eslint-disable-next-line sonarjs/prefer-immediate-return
	const StyledComponent = forwardRef<unknown, P & OuterProps>(renderFunction)

	// StyledComponent.displayName = name

	return StyledComponent
}
