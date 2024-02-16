// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { RequiredSubjectTree } from './SubjectTree'
import { SubjectTree } from './SubjectTree'

describe('SubjectTreeConstructor', () => {
	it('type', () => {
		const a = new SubjectTree({ a: 1 })
		$Assert<IsIdentical<typeof a, RequiredSubjectTree<{ a: number }>>>()
	})
})
