/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlsoAccept } from '../../../AlsoAccept'

/** Does not handle index signatures */
export type PickSimple_<O, K> = Pick<O, K & keyof O>

/** Does not handle index signatures */
export type PickSimple<
	O extends object,
	K extends keyof O | AlsoAccept<keyof any>
> = PickSimple_<O, K>
