// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AlsoAccept } from '@voltiso/util'

import type { Css } from '../Css/Css'

export interface CssExtension<CustomCss extends object = {}> {
	//

	/** Typing for `fela-plugin-typescript` */
	nested?: Css | AlsoAccept<Record<string, Css & CustomCss>> | undefined
}
