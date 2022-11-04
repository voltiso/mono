// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '~/$strip'

export function add<A extends number | bigint, B extends number | bigint>(
	a: A,
	b: B,
): A extends bigint ? bigint : B extends bigint ? bigint : number {
	if (typeof a === 'bigint' || typeof b === 'bigint') {
		const aa = typeof a === 'bigint' ? a : BigInt(a)
		const bb = typeof b === 'bigint' ? b : BigInt(b)
		return (aa + bb) as never
	} else {
		$assert(typeof a === 'number')
		$assert(typeof b === 'number')
		return (a + b) as never
	}
}
