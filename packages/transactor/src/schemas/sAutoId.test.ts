// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, it } from '@jest/globals'
import * as s from '@voltiso/schemar'

import { sAutoId } from './sAutoId'

describe('sAutoId', () => {
	it('does type-check', () => {
		void s.schema(sAutoId)
	})
})
