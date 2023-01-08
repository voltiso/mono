// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IndexedCssProps } from '~/_/CssProps'
import type { Css } from '~/Css/Css'
import type { Props } from '~/react-types'

import { prepare } from './prepare'

export function consumeCssProps<CustomCss extends object>(params: {
	props: Props
	cssProps: IndexedCssProps<CustomCss>
	styles: Css[]
	theme: object
	customCss: object | undefined
}) {
	// console.log('consumeCssProps', params.customCss)
	for (const [prop, value] of Object.entries(params.props)) {
		// assertNotPolluting(prop)
		// eslint-disable-next-line security/detect-object-injection
		const list = params.cssProps[prop] || []

		// const value = prepare(rawValue, params.theme, params.customCss)

		for (const entry of [...list].reverse()) {
			if (typeof entry === 'function') {
				if (entry.length > 0 || Boolean(value))
					params.styles.push(
						prepare(entry(value as never), {
							theme: params.theme,
							customCss: params.customCss,
						}),
					)
			} else if (value)
				params.styles.push(
					prepare(entry, {
						theme: params.theme,
						customCss: params.customCss,
					}) as never,
				)
		}
	}
}
