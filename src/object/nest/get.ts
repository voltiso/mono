import { checkPrototypePollution } from '../isConstructorOrProto'

export type Get<T, K> = K extends keyof T ? T[K] : never

export function get<O extends object, K extends keyof O>(o: O, k: K): Get<O, K> {
	checkPrototypePollution(o, k)
	return o[k] as never
}
