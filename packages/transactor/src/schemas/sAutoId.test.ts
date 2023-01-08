// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'

import { sAutoId } from './sAutoId'

describe('sAutoId', () => {
	it('does type-check', () => {
		void s.schema(sAutoId)
	})
})
