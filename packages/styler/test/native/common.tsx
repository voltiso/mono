// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { RenderAPI } from '@testing-library/react-native'
import { render } from '@testing-library/react-native'
import type { IRenderer } from 'fela'
// @ts-expect-error no typings
import { createRenderer } from 'fela-native'
import type { ReactNode } from 'react'

import { StyleProvider } from '../../src'

let renderer: IRenderer | undefined

export function getRenderer() {
	if (!renderer) {
		// renderer = createRenderer({
		// 	plugins: [typescript(), ...webPreset],
		// })

		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		renderer = createRenderer() as IRenderer

		// renderer.renderStatic(
		// 	{
		// 		margin: 0,
		// 	},
		// 	'body'
		// )
	}

	return renderer
}

export function renderApp(children: ReactNode): RenderAPI {
	return render(
		<StyleProvider renderer={getRenderer()}>{children}</StyleProvider>,
	)
}
