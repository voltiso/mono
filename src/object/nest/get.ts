/* eslint-disable no-undefined */
import { checkPrototypePollution } from '../isConstructorOrProto'

export type Get<T, K> = K extends keyof T ? T[K] : undefined

export function get<O extends object, K extends keyof O>(o: O, k: K): Get<O, K>
export function get(o: undefined, k: unknown): undefined

export function get<O extends object, K extends keyof O>(o: O | undefined, k: K): Get<O, K> | undefined

export function get<O extends object, K extends keyof O>(o: O | undefined, k: K): Get<O, K> | undefined {
	if (!o) return undefined

	checkPrototypePollution(o, k)
	return o[k] as never
}
