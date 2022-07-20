// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type { IPath } from '../../../Path'
import { setProperty } from '../../set/setProperty.js'

type Nest_<path, Accumulator> = path extends readonly []
	? Accumulator
	: path extends readonly [...infer T, infer H]
	? H extends string | number | symbol
		? Nest_<T, { [k in H]: Accumulator }>
		: never
	: never

export type Nest<X, path extends IPath> = Nest_<path, X>

export function nest<X, P extends IPath>(x: X, path: P): Nest<X, P> {
	if (path.length === 0) return x as never

	const result = {} as any
	let currentNested = result

	for (const token of path.slice(0, -1)) {
		setProperty(currentNested, token, {})
		// eslint-disable-next-line security/detect-object-injection
		currentNested = currentNested[token]
	}

	currentNested[path.at(-1) as any] = x
	return result
}
