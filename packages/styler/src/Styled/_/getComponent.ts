// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ForwardedRef } from 'react'
import { forwardRef } from 'react'

import type { IForwardRefRenderFunction, StylableLike, StyledTypeInfo } from '~'
import type { StyledData } from '~/_/StyledData/StyledData'
import type { OuterProps } from '~/Stylable/OuterProps'
import { getElementName } from '~/Styled/_/getElementName'

import { defineFunctionComponent } from './defineFunctionComponent'
import { render } from './render'

export function getComponent<
	$ extends StyledTypeInfo & { Component: StylableLike },
>(data: StyledData<$>) {
	const elementName = getElementName(data.component)
	const renderFunctionName = `StyledComponent<${elementName}>`
	const forwardRefName = `forwardRef(${renderFunctionName})`

	const renderFunction: IForwardRefRenderFunction = defineFunctionComponent(
		renderFunctionName,
		(props: $['Props'] & OuterProps, ref: ForwardedRef<unknown>) =>
			render<$>(props, ref, data),
	)

	renderFunction.displayName = renderFunctionName

	const StyledComponent = defineFunctionComponent(
		forwardRefName,
		forwardRef<unknown, $['Props'] & OuterProps>(renderFunction),
	)

	StyledComponent.displayName = forwardRefName

	return StyledComponent
}
