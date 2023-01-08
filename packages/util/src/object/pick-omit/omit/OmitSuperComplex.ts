// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AlsoAccept } from '~/type'

import type { OmitPrecise_ } from './OmitPrecise'
import type { OmitSimple_ } from './OmitSimple'

export type OmitSuperComplex_<O, K extends keyof any> = string extends keyof O
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

export type OmitSuperComplex<
	O extends object,
	K extends keyof O | AlsoAccept<keyof any>,
> = OmitSuperComplex_<O, K>
