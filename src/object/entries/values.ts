import { Value } from './Value'

export type Values<O extends object> = Value<O, keyof O>[]

export function values<O extends object>(o: O): Values<O> {
	return Object.values(o) as never
}
