// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { at } from '~/array'
import type { PropertyPath } from '~/object'
import { setProperty } from '~/object'
import type { AlsoAccept } from '~/type'

export type Nest_<acc, path> = path extends readonly []
	? acc
	: path extends readonly [...infer T, infer H]
	? H extends string | number | symbol
		? Nest_<{ [k in H]: acc }, T>
		: never
	: never

export type Nest<X, path extends PropertyPath> = Nest_<X, path>

export function nest<
	X,
	P extends PropertyPath | AlsoAccept<readonly (keyof any)[]>,
>(x: X, path: P): Nest_<X, P> {
	if (path.length === 0) return x as never

	const result = {} as any
	let currentNested = result

	for (const token of path.slice(0, -1)) {
		setProperty(currentNested, token, {})
		// eslint-disable-next-line security/detect-object-injection
		currentNested = currentNested[token]
	}

	currentNested[at(path, -1) as any] = x
	return result
}
