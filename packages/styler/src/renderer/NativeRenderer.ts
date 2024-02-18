// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable class-methods-use-this */

import { assignStyle } from 'css-in-js-utils'
import type { StyleObject } from 'css-in-js-utils/es/cssifyObject'

import type { Css } from '../Css'

export class NativeRenderer {
	styleFor(...stylerStyles: Css[]): StyleObject {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		return (assignStyle as any)(...stylerStyles) as never
	}
}
