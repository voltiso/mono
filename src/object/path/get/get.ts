import { IPath } from '../IPath'
import { Path } from '../Path'
import { GetPath } from './GetPath'
import { Get } from './GetProperty'
import { getProperty_ } from './_'

//

export function get<O extends object, K extends keyof O>(o: O, k: K): Get<O, K>
export function get(o: undefined, k: unknown): undefined

export function get<O extends object, K extends keyof O>(o: O | undefined, k: K): Get<O, K> | undefined

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
	let r = o
	for (const token of path) {
		r = getProperty_(r, token)
	}
	return r as never
}
