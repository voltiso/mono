// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ReadonlyPropertyPath } from '~/object'

import type { TryGetProperty } from './tryGetProperty'
import { tryGetProperty } from './tryGetProperty'

type TryGet_<O, P> = P extends readonly []
	? O
	: O extends undefined | null
		? undefined
		: O extends object
			? P extends readonly [infer H, ...infer T]
				? TryGet_<TryGetProperty<O, H>, T>
				: never
			: never

export type TryGet<
	O extends object | undefined | null,
	P extends readonly [] | ReadonlyPropertyPath<O>,
> = TryGet_<O, P>

//

export function tryGet<O extends object, K extends keyof O>(
	o: O,
	k: K,
): TryGetProperty<O, K>
export function tryGet(o: undefined, k: unknown): undefined

export function tryGet<O extends object, K extends keyof O>(
	o: O | undefined,
	k: K,
): TryGetProperty<O, K> | undefined

//

export function tryGet<
	O extends object,
	P extends readonly [] | ReadonlyPropertyPath<O>,
>(o: O, ...path: P): TryGet<O, P>
export function tryGet<
	O extends object,
	P extends readonly [] | ReadonlyPropertyPath<O>,
>(o: O, path: P): TryGet<O, P>

export function tryGet(
	o: undefined,
	...path: readonly [] | ReadonlyPropertyPath
): undefined

export function tryGet(
	o: undefined,

	path: readonly [] | ReadonlyPropertyPath,
): undefined

export function tryGet<
	O extends object,
	P extends readonly [] | ReadonlyPropertyPath<O>,
>(o: O | undefined, ...path: P): TryGet<O, P> | undefined
export function tryGet<
	O extends object,
	P extends readonly [] | ReadonlyPropertyPath<O>,
>(o: O | undefined, path: P): TryGet<O, P> | undefined

//

export function tryGet<
	O extends object,
	P extends readonly [] | ReadonlyPropertyPath<O>,
>(o: O | undefined, ...x: P | [P]): TryGet<O, P> | undefined {
	const path = (Array.isArray(x[0]) ? x[0] : x) as P
	let r = o

	for (const token of path) {
		r = tryGetProperty(r, token as never) as never
	}

	return r as never
}
