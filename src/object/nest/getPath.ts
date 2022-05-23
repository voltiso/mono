/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { get } from './get'
import { IPath } from './IPath'
import { Path } from './Path'

export type GetPath_<O, P> = O extends undefined
	? undefined
	: P extends readonly []
	? O
	: P extends readonly [infer H, ...infer T]
	? H extends keyof O
		? GetPath_<O[H], T>
		: never
	: never

export type GetPath<O extends object | undefined | null, P extends Path<O>> = GetPath_<O, P>

export function getPath<O extends object, P extends Path<O>>(o: O, path: P): GetPath<O, P>

export function getPath(o: undefined, path: IPath): undefined

export function getPath<O extends object, P extends Path<O>>(o: O | undefined, path: P): GetPath<O, P> | undefined

export function getPath<O extends object, P extends Path<O>>(o: O | undefined, path: P): GetPath<O, P> | undefined {
	let r = o as any
	for (const token of path) {
		r = get(r, token)
	}
	return r
}
