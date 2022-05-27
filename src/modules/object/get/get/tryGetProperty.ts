/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undefined */
import { assertNotPolluting } from '../../isPolluting'

// @ts-expect-error cannot use `K` to index `T`
export type TryGetProperty<T, K> = (T & Record<keyof any, undefined>)[K]

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
