// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	ICssProp,
	IndexedCssProps,
	IndexedCssPropsSingle,
} from '~/_/CssProps'
import type { PropValueFromCssProp } from '~/Styled/_/PropValueFromCssProp'

export type PropsFromCssProps<
	CP extends IndexedCssProps | IndexedCssPropsSingle,
> = {
	[k in keyof CP]?:
		| undefined
		| (CP[k] extends ICssProp
				? PropValueFromCssProp<CP[k]>
				: CP[k] extends ICssProp[]
				? PropValueFromCssProp<CP[k][number]>
				: never)
}
