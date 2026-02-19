// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $fastAssert } from '@voltiso/util'

// eslint-disable-next-line import/no-default-export
export default function simple(x: number): number {
	// eslint-disable-next-line no-param-reassign
	x -= 1

	$fastAssert(x) // comment

	return x
}
