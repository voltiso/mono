/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlsoAccept } from '../../../AlsoAccept'
import { Omit_ } from './Omit_'

/** Does not work with index signatures */
export type OmitTrivial_<O, K> = Omit_<O, K>

/** Discards index signatures */
export type OmitTrivial<
	O extends object,
	K extends keyof O | AlsoAccept<keyof any>
> = OmitTrivial_<O, K>
