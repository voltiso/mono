/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlsoAccept } from '../../../../AlsoAccept'
import { OmitPrecise_ } from './OmitPrecise'
import { OmitSimple_ } from './OmitSimple'

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
	K extends keyof O | AlsoAccept<keyof any>
> = VOmit_<O, K>