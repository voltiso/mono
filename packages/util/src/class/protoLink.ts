// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '../_/assert.js'
import type { Reverse } from '../array'
import type { MergeN } from '../object'

/* eslint-disable security/detect-object-injection */

// type Intersect_acc<R, args extends unknown[]> = args extends [infer a, ...infer rest] ? Intersect_acc<R & a, rest> : R
// type Intersect<args extends unknown[]> = Intersect_acc<{}, args>

export function protoLink<Args extends object[]>(
	...args: Args
): MergeN<Reverse<Args>> {
	const last = args.length - 1
	const beforeLast = last - 1

	for (let index = beforeLast; index >= 0; --index) {
		const oldProto = Object.getPrototypeOf(args[index]) as object
		assert(oldProto === Object.prototype || oldProto === Function.prototype)
		Object.setPrototypeOf(args[index], args[index + 1] as object)
	}

	return args[0] as never
}
