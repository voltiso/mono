// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Keyof } from '@voltiso/util'

import type {
	ICssProp,
	IndexedCssProps,
	IndexedCssPropsSingle,
} from '~/_/CssProps'

import type { PropValueFromCssProp } from '../_/PropValueFromCssProp'

export type PropsFromCssProps<
	CP extends IndexedCssProps | IndexedCssPropsSingle,
> = {
	[k in Keyof<CP>]?:
		| undefined
		| (CP[k] extends ICssProp
				? PropValueFromCssProp<CP[k]>
				: CP[k] extends ICssProp[]
				? PropValueFromCssProp<CP[k][number]>
				: never)
}
