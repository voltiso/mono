/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-multi-assign */
/* eslint-disable no-magic-numbers */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { IPath } from '../../../Path'

type Nest_<path, Acc> = path extends readonly []
	? Acc
	: path extends readonly [...infer T, infer H]
	? H extends string | number | symbol
		? Nest_<T, { [k in H]: Acc }>
		: never
	: never

type Nest<X, path extends IPath> = Nest_<path, X>

export function nest<X, P extends IPath>(x: X, path: P): Nest<X, P> {
	if (path.length === 0) return x as any

	const r = {} as any
	let c = r
	for (const token of path.slice(0, -1)) {
		c = c[token] = {}
	}
	c[path.at(-1) as any] = x
	return r
}
