// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $fastAssert } from '@voltiso/util'

export default function simple(x: number) {
	// eslint-disable-next-line no-param-reassign
	x -= 1

	$fastAssert(x) // comment

	return x
}
