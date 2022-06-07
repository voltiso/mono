/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlsoAccept } from '../../../AlsoAccept'
import { PickSimple_ } from '../pick/PickSimple'
import { OmitIndexSignatures } from './OmitIndexSignatures'

/** Discards index signatures */
export type OmitSimple_<O, K> = O extends object
	? PickSimple_<O, Exclude<keyof OmitIndexSignatures<O>, K>>
	: never

/** Discards index signatures */
export type OmitSimple<
	O extends object,
	K extends keyof O | AlsoAccept<keyof any>
> = OmitSimple_<O, K>
