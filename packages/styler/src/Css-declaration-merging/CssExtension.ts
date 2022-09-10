// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AlsoAccept } from '@voltiso/util'

import type { Css } from '../Css/Css'

export interface CssExtension {
	//

	/** Typing for `fela-plugin-typescript` */
	nested?: Css | AlsoAccept<Record<string, Css>> | undefined
}
