/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlsoAccept } from '../../../AlsoAccept'
import { OmitIndexSignatures } from '../omit'

/** Discards index signatures */
export type PickSimple_<O, K> = Pick<
	OmitIndexSignatures<O>,
	K & keyof OmitIndexSignatures<O>
>

/** Discards index signatures */
export type PickSimple<
	O extends object,
	K extends keyof O | AlsoAccept<keyof any>
> = PickSimple_<O, K>
