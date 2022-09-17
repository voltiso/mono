// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Keyof } from '@voltiso/util'

import type { Props } from '~/react-types'

import type { CssProp } from './CssProp'

export type CssProps<P extends Props, CustomCss extends object> = {
	[k in Keyof<P>]: CssProp<P[k], CustomCss>[]
}
