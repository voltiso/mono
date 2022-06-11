import { Path, IPath } from '../../Path'
import { TryGetProperty, tryGetProperty } from './tryGetProperty'

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
	P extends Path<O>
> = TryGet_<O, P>

//

export function tryGet<O extends object, K extends keyof O>(
	o: O,
	k: K
): TryGetProperty<O, K>
export function tryGet(o: undefined, k: unknown): undefined

export function tryGet<O extends object, K extends keyof O>(
	o: O | undefined,
	k: K
): TryGetProperty<O, K> | undefined

//

export function tryGet<O extends object, P extends Path<O>>(
	o: O,
	...path: P
): TryGet<O, P>
export function tryGet<O extends object, P extends Path<O>>(
	o: O,
	path: P
): TryGet<O, P>

export function tryGet(o: undefined, ...path: IPath): undefined
export function tryGet(o: undefined, path: IPath): undefined

export function tryGet<O extends object, P extends Path<O>>(
	o: O | undefined,
	...path: P
): TryGet<O, P> | undefined
export function tryGet<O extends object, P extends Path<O>>(
	o: O | undefined,
	path: P
): TryGet<O, P> | undefined

//

export function tryGet<O extends object, P extends Path<O>>(
	o: O | undefined,
	...x: P | [P]
): TryGet<O, P> | undefined {
	const path = (Array.isArray(x[0]) ? x[0] : x) as P
	let r = o
	for (const token of path) {
		r = tryGetProperty(r, token)
	}
	return r as never
}
