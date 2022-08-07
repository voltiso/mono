// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { forwardRef } from 'react'

import type { IStylable } from '~'
import type { StyledData } from '~/_/StyledData/StyledData'
import type { OuterProps } from '~/Stylable/OuterProps'
import { getElementName } from '~/Styled/_/getElementName'

import { render } from './render'

export function getComponent<P, C extends IStylable>(data: StyledData<P, C>) {
	// eslint-disable-next-line react/require-optimization
	const StyledComponent = forwardRef<unknown, P & OuterProps>((props, ref) =>
		render<P, C>(props, ref, data),
	)
	StyledComponent.displayName = `style(${getElementName(data.element)})`
	return StyledComponent
}
