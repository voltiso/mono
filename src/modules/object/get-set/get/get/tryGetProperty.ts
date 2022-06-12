/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undefined */
import { IsOptionalImpl } from '../../../IsOptional'
import { assertNotPolluting } from '../../isPolluting'

// @ts-expect-error cannot use `K` to index `T`
export type TryGetPropertyImpl<T, K> = (T & Record<keyof any, undefined>)[K]

export type TryGetProperty<T, K> = K extends keyof T
	? IsOptionalImpl<T, K> extends true
		? T[K] | undefined
		: string extends K
		? T[K] | undefined
		: number extends K
		? T[K] | undefined
		: symbol extends K
		? T[K] | undefined
		: T[K]
	: TryGetPropertyImpl<T, K>

//

export function tryGetProperty<O extends object, K extends keyof O>(
	o: O,
	k: K
): TryGetProperty<O, K>
export function tryGetProperty(o: undefined, k: unknown): undefined

export function tryGetProperty<O extends object, K extends keyof O>(
	o: O | undefined,
	k: K
): TryGetProperty<O, K> | undefined

export function tryGetProperty<O extends object, K extends keyof O>(
	o: O | undefined,
	k: K
): TryGetProperty<O, K> | undefined {
	if (!o) return undefined

	assertNotPolluting(o, k)
	return o[k] as never
}
