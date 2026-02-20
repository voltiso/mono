// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

'use strict'

const { describe, expect, it } = require('@jest/globals')

const { firestore, srcFirestore } = require('./common/index.cjs')

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
