/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { GetField, getProperty } from './getProperty'
import { IPath } from '../IPath'
import { Path } from '../Path'

export type GetPath_<O, P> = P extends readonly []
	? O
	: O extends undefined | null
	? undefined
	: O extends object
	? P extends readonly [infer H, ...infer T]
		? H extends keyof O
			? GetPath_<O[H], T>
			: undefined
		: never
	: never

export type GetPath<O extends object | undefined | null, P extends Path<O>> = GetPath_<O, P>

//

export function get<O extends object, K extends keyof O>(o: O, k: K): GetField<O, K>
export function get(o: undefined, k: unknown): undefined

export function get<O extends object, K extends keyof O>(o: O | undefined, k: K): GetField<O, K> | undefined

//

export function get<O extends object, P extends Path<O>>(o: O, ...path: P): GetPath<O, P>
export function get<O extends object, P extends Path<O>>(o: O, path: P): GetPath<O, P>

export function get(o: undefined, ...path: IPath): undefined
export function get(o: undefined, path: IPath): undefined

export function get<O extends object, P extends Path<O>>(o: O | undefined, ...path: P): GetPath<O, P> | undefined
export function get<O extends object, P extends Path<O>>(o: O | undefined, path: P): GetPath<O, P> | undefined

//

export function get<O extends object, P extends Path<O>>(o: O | undefined, ...x: P | [P]): GetPath<O, P> | undefined {
	const path = (Array.isArray(x[0]) ? x[0] : x) as P
	let r = o as any
	for (const token of path) {
		r = getProperty(r, token)
	}
	return r
}
