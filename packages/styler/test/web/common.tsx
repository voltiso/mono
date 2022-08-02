// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { RenderResult } from '@testing-library/react'
import { render } from '@testing-library/react'
import type { IRenderer } from 'fela'
import { createRenderer } from 'fela'
import typescript from 'fela-plugin-typescript'
import webPreset from 'fela-preset-web'
import type { ReactNode } from 'react'

import { StyleProvider } from '~'

let renderer: IRenderer | undefined

export function getRenderer() {
	if (!renderer) {
		renderer = createRenderer({
			plugins: [typescript(), ...webPreset],
		})

		renderer.renderStatic(
			{
				margin: 0,
			},
			'body',
		)
	}

	return renderer
}

export function renderApp(children: ReactNode): RenderResult {
	return render(
		<StyleProvider renderer={getRenderer()}>{children}</StyleProvider>,
	)
}
