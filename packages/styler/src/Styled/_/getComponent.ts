// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ForwardedRef } from 'react'
import { forwardRef } from 'react'

import type { IForwardRefRenderFunction, IStylable } from '~'
import type { StyledData } from '~/_/StyledData/StyledData'
import type { OuterProps } from '~/Stylable/OuterProps'
import { getElementName } from '~/Styled/_/getElementName'

import { defineFunctionComponent } from './defineFunctionComponent'
import { render } from './render'

export function getComponent<P, C extends IStylable>(data: StyledData<P, C>) {
	const elementName = getElementName(data.element)
	const renderFunctionName = `StyledComponent<${elementName}>`
	const forwardRefName = `forwardRef(${renderFunctionName})`

	const renderFunction: IForwardRefRenderFunction = defineFunctionComponent(
		renderFunctionName,
		(props: P & OuterProps, ref: ForwardedRef<unknown>) =>
			render<P, C>(props, ref, data),
	)

	renderFunction.displayName = renderFunctionName

	const StyledComponent = defineFunctionComponent(
		forwardRefName,
		forwardRef<unknown, P & OuterProps>(renderFunction),
	)

	StyledComponent.displayName = forwardRefName

	return StyledComponent
}
