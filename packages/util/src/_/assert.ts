// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AlsoAccept } from '~/type/AlsoAccept'

import { AssertionError } from './AssertionError'

export function assert(
	condition: boolean | AlsoAccept<unknown>,
	message?: string,
): asserts condition {
	if (!condition) throw new AssertionError(message)
}
