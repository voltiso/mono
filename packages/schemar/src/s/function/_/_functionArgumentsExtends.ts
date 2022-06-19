import { ISchema } from '../../../schema'
import { isTuple, ITuple } from '../../tuple'
import * as s from '../..'

// type Fun<Args extends unknown[]> = (...args: Args) => 0

// type Test<A extends unknown[], B extends unknown[]> = Fun<B> extends Fun<A>
// 	? 1
// 	: 0

// type A = Test<[1], unknown[]> // 1
// type B = Test<unknown[], [1]> // 0
// type C = Test<[1, 2, 3], [1, 2]> // 1
// type D = Test<[1, 2], [1, 2, 3]> // 0

function _functionArgumentsExtends_(a: ITuple, b: ITuple): boolean {
	const aa = a.getElementSchemas
	const bb = b.getElementSchemas

	if (aa.length < bb.length) return false

	for (let i = 0; i < bb.length; ++i) {
		const ok = s.schema(aa[i]).extends(bb[i])
		if (!ok) return false
	}

	return true
}

/**
 * TODO: make it work with arrays with bounded lengths
 */
export function _functionArgumentsExtends(a: ISchema, b: ISchema): boolean {
	const aOk = isTuple(a)
	const bOk = isTuple(b)
	if (aOk && bOk) return _functionArgumentsExtends_(a, b)
	else return a.extends(b)
}
