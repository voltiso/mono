/* eslint-disable no-undefined */
import { checkPrototypePollution } from '../../isConstructorOrProto'

export type GetField<T, K> = K extends keyof T ? T[K] : undefined

export function getProperty<O extends object, K extends keyof O>(o: O, k: K): GetField<O, K>
export function getProperty(o: undefined, k: unknown): undefined

export function getProperty<O extends object, K extends keyof O>(o: O | undefined, k: K): GetField<O, K> | undefined

export function getProperty<O extends object, K extends keyof O>(o: O | undefined, k: K): GetField<O, K> | undefined {
	if (!o) return undefined

	checkPrototypePollution(o, k)
	return o[k] as never
}
