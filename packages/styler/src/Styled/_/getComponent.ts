// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ForwardedRef } from 'react'
import type React from 'react'
import { forwardRef } from 'react'

import type { IForwardRefRenderFunction } from '~/_/StyledData'
import type { StyledData } from '~/_/StyledData/StyledData'
import type { StylableLike } from '~/Stylable'
import type { NativeOuterProps, OuterProps } from '~/Stylable/OuterProps'
import { getElementName } from '~/Styled/_/getElementName'
import type { StyledTypeInfo } from '~/StyledTypeInfo'

import { defineFunctionComponent } from './defineFunctionComponent'
import { render } from './render'

export type __hack_GetComponent = NativeOuterProps

export type GetComponentResult<
	$ extends StyledTypeInfo & { Component: StylableLike },
> = React.ForwardRefExoticComponent<
	React.PropsWithoutRef<$['Props'] & OuterProps> & React.RefAttributes<unknown>
>

export function getComponent<
	$ extends StyledTypeInfo & { Component: StylableLike },
>(data: StyledData<$>): GetComponentResult<$> {
	const elementName = getElementName(data.component)
	const renderFunctionName = `StyledComponent<${elementName}>`
	const forwardRefName = `forwardRef(${renderFunctionName})`

	// // forward ref (but not css)
	// if (typeof data.component === 'function' && data.component.length === 2) {
	// 	// eslint-disable-next-line no-param-reassign
	// 	data = {
	// 		...data,
	// 		component: forwardRef(data.component as never),
	// 	}
	// }

	const renderFunction: IForwardRefRenderFunction = defineFunctionComponent(
		renderFunctionName,
		(props: $['Props'] & OuterProps, ref: ForwardedRef<unknown>) =>
			render<$>(props, ref, data) as never,
	)

	renderFunction.displayName = renderFunctionName

	const StyledComponent = defineFunctionComponent(
		forwardRefName,
		forwardRef<unknown, $['Props'] & OuterProps>(renderFunction),
	)

	StyledComponent.displayName = forwardRefName

	return StyledComponent
}
