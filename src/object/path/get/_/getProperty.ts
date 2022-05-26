/* eslint-disable no-undefined */
import { checkPrototypePollution } from '../../../isConstructorOrProto'

export type GetProperty<T, K> = K extends keyof T ? T[K] : undefined

export function getProperty<O extends object, K extends keyof O>(o: O, k: K): GetProperty<O, K>
export function getProperty(o: undefined, k: unknown): undefined

export function getProperty<O extends object, K extends keyof O>(o: O | undefined, k: K): GetProperty<O, K> | undefined

export function getProperty<O extends object, K extends keyof O>(
	o: O | undefined,
	k: K
): GetProperty<O, K> | undefined {
	if (!o) return undefined

	checkPrototypePollution(o, k)
	return o[k] as never
}
