// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from 'vitest'
import { firestore, srcFirestore } from './common/index.cjs'

const { createFirestoreTransactor } = srcFirestore

describe('transactor', () => {
	it('throws on unknown options', async () => {
		expect.hasAssertions()
		// @ts-expect-error ...
		expect(() => createFirestoreTransactor(firestore, { asd: 123 })).toThrow(
			'Unknown option',
		)
	})
})
