// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { RenderAPI } from '@testing-library/react-native'
import { render } from '@testing-library/react-native'
import type { ReactNode } from 'react'

import { NativeRenderer } from '~'
import { RendererContext } from '~/client'

let renderer: NativeRenderer | undefined

export function getRenderer() {
	if (!renderer) {
		// renderer = createRenderer({
		// 	plugins: [typescript(), ...webPreset],
		// })

		renderer = new NativeRenderer()

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
		<RendererContext.Provider value={getRenderer()}>
			{children}
		</RendererContext.Provider>,
	)
}
