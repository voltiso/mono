// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import * as s from '@voltiso/schemar'

import { createTransactor, database } from '../common'

const db = createTransactor({ onUnknownField: 'error', checkDecorators: false })

// eslint-disable-next-line jest/require-hook
db('doctor/*').public({
	specialty: s.string.optional,
})

describe('raw-public', function () {
	it('should validate schema', async function () {
		expect.hasAssertions()

		await database.doc('doctor/anthony').delete()

		await expect(
			db('doctor', 'anthony').set({ favoriteOrganMarket: 'WHM' }),
		).rejects.toThrow('favoriteOrganMarket')
		await expect(db('doctor/anthony')).resolves.toBeNull()
	})
})
