// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import * as s from '~'

export const validationIssue = lazyValue(() => ({
	path: s.array(s.union(s.string, s.number, s.symbol)),
	name: s.string.optional,

	expectedOneOf: s.array.optional,
	expectedDescription: s.string.optional,

	received: s.optional,
	receivedDescription: s.string.optional,

	toString: s.function(s.tuple(), s.string),
}))
