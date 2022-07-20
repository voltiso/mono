// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IRenderer } from 'fela'
import type { ReactNode } from 'react'
import { Component } from 'react'
import { RendererProvider, ThemeProvider, useFela } from 'react-fela'
// import { getRenderer } from '../style/getRenderer'

// const fallbackRenderer = getRenderer()

interface Props<T extends object> {
	renderer: IRenderer
	theme?: T
	children?: ReactNode
}

export class StyleProvider<T extends object> extends Component<Props<T>> {
	override render() {
		const renderer = this.props.renderer // || fallbackRenderer
		const theme = this.props.theme || {}
		return (
			// @ts-expect-error hmm
			<RendererProvider renderer={renderer}>
				{/* @ts-expect-error hmm */}
				<ThemeProvider theme={theme}>{this.props.children}</ThemeProvider>
			</RendererProvider>
		)
	}
}

// eslint-disable-next-line etc/no-misused-generics
export function useStyle<T extends object>() {
	return useFela<T>() as Props<T>
}

// eslint-disable-next-line etc/no-misused-generics
export function useTheme<T extends object>() {
	return useStyle<T>().theme
}
