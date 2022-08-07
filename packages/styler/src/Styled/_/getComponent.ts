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
	const elementName = getElementName(data.element)
	const outerName = `StyledComponent<${elementName}>`
	const renderFunctionName = `${outerName}.renderFunction`

	// eslint-disable-next-line security/detect-object-injection
	const renderFunction: ForwardRefRenderFunction<unknown, P & OuterProps> = {
		[renderFunctionName]: (props: P & OuterProps, ref: ForwardedRef<unknown>) =>
			render<P, C>(props, ref, data),
	}[renderFunctionName] as never

	renderFunction.displayName = renderFunctionName

	const StyledComponent = forwardRef<unknown, P & OuterProps>(renderFunction)
	StyledComponent.displayName = outerName

	return StyledComponent
}
