// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AlsoAccept } from '@voltiso/util'

import type { Css, CustomCss } from '~/Css/Css'

export interface CssExtension<AdditionalCss extends object = {}> {
	//
	// /** Typing for `fela-plugin-typescript` */
	_?:
		| Css<AdditionalCss>
		| AlsoAccept<Record<string, Css<AdditionalCss> & CustomCss & AdditionalCss>>
		| undefined
}
