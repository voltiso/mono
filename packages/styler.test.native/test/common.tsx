// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { RenderAPI } from '@testing-library/react-native'
import { render } from '@testing-library/react-native'
import { NativeRenderer } from '@voltiso/styler'
import { RendererContext } from '@voltiso/styler/client'
import type React from 'react'

let renderer: NativeRenderer | undefined

export function getRenderer(): NativeRenderer {
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

export function renderApp(children: React.ReactNode): RenderAPI {
	return render(
		<RendererContext.Provider value={getRenderer()}>
			{children}
		</RendererContext.Provider>,
	)
}
