// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AlsoAccept } from '@voltiso/util'

import type { Css, CustomCss } from './Css'

export type RelaxedCss = Css | AlsoAccept<Record<string, Css>>

export type RelaxedCustomCss<AdditionalCss extends object = {}> =
	| CustomCss<AdditionalCss>
	| AlsoAccept<Record<string, CustomCss<AdditionalCss> & AdditionalCss>>
