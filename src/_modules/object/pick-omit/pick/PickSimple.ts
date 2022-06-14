/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlsoAccept } from '../../../../AlsoAccept'
import { OmitSignatures } from '../omit'

/** Discards index signatures */
export type PickSimple_<O, K> = Pick<
	OmitSignatures<O>,
	K & keyof OmitSignatures<O>
>

/** Discards index signatures */
export type PickSimple<
	O extends object,
	K extends keyof O | AlsoAccept<keyof any>
> = PickSimple_<O, K>
