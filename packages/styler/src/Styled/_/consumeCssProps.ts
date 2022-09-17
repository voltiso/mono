// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getEntries, tryGetProperty } from '@voltiso/util'

import type { IndexedCssProps } from '~/_/CssProps'
import type { Css } from '~/Css/Css'
import type { IndexedProps } from '~/react-types'

import { prepare } from './prepare'

export function consumeCssProps<CustomCss extends object>(params: {
	props: IndexedProps
	consumed: IndexedCssProps<CustomCss>
	all: IndexedCssProps<CustomCss>
	styles: Css[]
	theme: object
	customCss?: object | undefined
}) {
	// console.log('consumeCssProps', params.customCss)
	for (const [prop, value] of getEntries(params.props)) {
		const list = tryGetProperty(params.all, prop) || []

		for (const entry of [...list].reverse()) {
			if (typeof entry === 'function') {
				if (entry.length > 0 || Boolean(value))
					params.styles.push(
						prepare(entry(value as never), params.theme, params.customCss),
					)
			} else if (value)
				params.styles.push(
					prepare(entry, params.theme, params.customCss) as never,
				)
		}
	}
}
