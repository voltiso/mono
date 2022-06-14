import { AlsoAccept } from '../../../../AlsoAccept'
import { Value } from '../value'

export type Key<
	O extends object,
	V extends Value<O> | AlsoAccept<unknown> = unknown
> = Key_<O, V>

export type Key_<O, V> = Value<{
	[k in keyof O as O[k] extends V ? k : never]: k
}>
