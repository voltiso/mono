// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	ICssProp,
	IndexedCssProps,
	IndexedCssPropsSingle,
} from '~/_/CssProps'
import type { PropValueFromCssProp } from '~/Styled/_/PropValueFromCssProp'

export type PropsFromCssProps<
	CP extends IndexedCssProps<CustomCss> | IndexedCssPropsSingle<CustomCss>,
	CustomCss extends object,
> = {
	[k in keyof CP]?:
		| undefined
		| (CP[k] extends ICssProp<CustomCss>
				? PropValueFromCssProp<CP[k], CustomCss>
				: CP[k] extends ICssProp<CustomCss>[]
					? PropValueFromCssProp<CP[k][number], CustomCss>
					: never)
}
