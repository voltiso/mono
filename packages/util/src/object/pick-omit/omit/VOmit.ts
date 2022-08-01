// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AlsoAccept } from '~'

import type { OmitPrecise_ } from './OmitPrecise'
import type { OmitSimple_ } from './OmitSimple'

export type VOmit_<O, K> = string extends keyof O
	? string extends K
		? OmitSimple_<O, K>
		: OmitPrecise_<O, K>
	: number extends keyof O
	? number extends K
		? OmitSimple_<O, K>
		: OmitPrecise_<O, K>
	: symbol extends keyof O
	? symbol extends K
		? OmitSimple_<O, K>
		: OmitPrecise_<O, K>
	: OmitSimple_<O, K>

export type VOmit<
	O extends object,
	K extends keyof O | AlsoAccept<keyof any>,
> = VOmit_<O, K>
