// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assertNotPolluting } from '~/object/get-set/isPolluting'
import type { IsOptional } from '~/object/IsOptional'
import type { AlsoAccept } from '~/type'

// @ts-expect-error cannot use `K` to index `T`
export type TryGetPropertyImpl<T, K> = (T & Record<keyof any, undefined>)[K]

export type TryGetProperty<T, K> = K extends keyof T
	? IsOptional<T, K> extends true
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

export function tryGetProperty<
	O extends object,
	K extends keyof O | AlsoAccept<keyof any>,
>(o: O, k: K): TryGetProperty<O, K>
export function tryGetProperty(o: undefined, k: unknown): undefined

export function tryGetProperty<
	O extends object,
	K extends keyof O | AlsoAccept<keyof any>,
>(o: O | undefined, k: K): TryGetProperty<O, K> | undefined

export function tryGetProperty<
	O extends object,
	K extends keyof O | AlsoAccept<keyof any>,
>(o: O | undefined, k: K): TryGetProperty<O, K> | undefined {
	if (!o) return undefined

	assertNotPolluting(o, k)
	return o[k as keyof O] as never
}
