import { Reverse } from '../array'
import { assert } from '../assert'
import { Merge } from '../object'

// type Intersect_acc<R, args extends unknown[]> = args extends [infer a, ...infer rest] ? Intersect_acc<R & a, rest> : R
// type Intersect<args extends unknown[]> = Intersect_acc<{}, args>

export const protoLink = <Args extends object[]>(...args: Args) => {
	for (let i = args.length - 2; i >= 0; --i) {
		const oldProto = Object.getPrototypeOf(args[i]) as object
		assert(oldProto === Object.prototype || oldProto === Function.prototype)
		Object.setPrototypeOf(args[i], args[i + 1] as object)
	}
	return args[0] as Merge<Reverse<Args>>
}
