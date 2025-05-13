// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, it } from '@jest/globals'
import { $Assert } from '@voltiso/util'

import type { IDocRef } from './IDocRef'
import type { DocRef } from './StrongDocRef'

describe('IDocRef', () => {
	it('type', () => {
		$Assert.is<DocRef, IDocRef>()
	})
})
