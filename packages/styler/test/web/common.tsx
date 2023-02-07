// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// eslint-disable-next-line import/no-unassigned-import
import '@testing-library/jest-dom'

import type { RenderResult } from '@testing-library/react'
import { render } from '@testing-library/react'
import type { ReactNode } from 'react'

import { NextStylerRegistry } from '~'

// let renderer: WebRenderer | undefined

// export function getRenderer() {
// 	if (!renderer) {
// 		renderer = new WebRenderer()

// 		// renderer.renderStatic(
// 		// 	{
// 		// 		margin: 0,
// 		// 	},
// 		// 	'body',
// 		// )
// 	}

// 	return renderer
// }

export function renderApp(children: ReactNode): RenderResult {
	return render(<NextStylerRegistry>{children}</NextStylerRegistry>)
}
