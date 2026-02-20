// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assignStyle } from 'css-in-js-utils'
import type { StyleObject } from 'css-in-js-utils/es/cssifyObject'

import type { Css } from '../Css'

export class NativeRenderer {
	styleFor(...stylerStyles: Css[]): StyleObject {
		return (assignStyle as any)(...stylerStyles) as never
	}
}
