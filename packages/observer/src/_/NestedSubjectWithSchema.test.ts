// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemableLike } from '@voltiso/schemar.types'
import { Assert } from '@voltiso/util'

import type {
	INestedSubjectWithSchema,
	NestedSubjectWithSchema,
} from './NestedSubjectWithSchema'

describe('NestedSubjectWithSchema', () => {
	it('generic', <S extends SchemableLike>() => {
		expect.assertions(0)

		Assert.is<NestedSubjectWithSchema<S>, INestedSubjectWithSchema>()
	})
})
