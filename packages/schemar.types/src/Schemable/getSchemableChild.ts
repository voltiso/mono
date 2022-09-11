// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isObject } from '~/custom-schemas/object'
import { isTuple } from '~/custom-schemas/tuple'

import type { GetShape } from './getDeepShape'
import type { SchemableWithShape } from './SchemableWithShape'

export function getSchemableChild<
	S extends SchemableWithShape,
	Child extends keyof GetShape<S>,
>(s: S, child: Child): GetShape<S>[Child] {
	// assertNotPolluting(child)
	if (isObject(s) || isTuple(s)) {
		return s.getShape[child as never] as never
	} else {
		return s[child as never]
	}
}
