// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assignStyle } from 'css-in-js-utils'
import type { StyleObject } from 'css-in-js-utils/es/cssifyObject'

import type { Css } from '../Css'

export class NativeRenderer {
	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
	styleFor(...stylerStyles: Css[]): StyleObject {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		return (assignStyle as any)(...stylerStyles) as never
	}
}
