// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IRenderer } from 'fela'
import type { ReactNode } from 'react'
import { RendererProvider, ThemeProvider, useFela } from 'react-fela'
// import { getRenderer } from '~/style/getRenderer'

// const fallbackRenderer = getRenderer()

interface Props<T extends object> {
	renderer: IRenderer
	theme?: T | undefined
	children?: ReactNode | undefined
}

export const StyleProvider = <Theme extends object>(props: Props<Theme>) => {
	const renderer = props.renderer // || fallbackRenderer
	const theme = props.theme || {}

	return (
		// @ts-expect-error hmm...
		<RendererProvider renderer={renderer}>
			{/* @ts-expect-error hmm... */}

			<ThemeProvider theme={theme}>{props.children}</ThemeProvider>
		</RendererProvider>
	)
}

// export class StyleProvider<T extends object> extends Component<Props<T>> {
// 	override render() {
// 		const renderer = this.props.renderer // || fallbackRenderer
// 		const theme = this.props.theme || {}
// 		return (
// 			// @ts-expect-error hmm
// 			<RendererProvider renderer={renderer}>
// 				{/* @ts-expect-error hmm */}
// 				<ThemeProvider theme={theme}>{this.props.children}</ThemeProvider>
// 			</RendererProvider>
// 		)
// 	}
// }

export function useStyle<Theme extends object>() {
	return useFela<Theme>() as Props<Theme>
}

export function useTheme<Theme extends object>() {
	return useStyle<Theme>().theme
}
