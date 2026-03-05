// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'
import { describe, it } from 'vitest'

import type { IDocRef } from './IDocRef'
import type { DocRef } from './StrongDocRef'

describe('IDocRef', () => {
	it('type', () => {
		$Assert.is<DocRef, IDocRef>()
	})
})
