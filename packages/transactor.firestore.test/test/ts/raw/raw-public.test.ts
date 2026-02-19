// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import * as s from '@voltiso/schemar'
import type {
	ANY_DOC,
	DocIdString,
	IDoc,
	WeakDocRef,
} from '@voltiso/transactor'
import { Transactor } from '@voltiso/transactor'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import { firestore, firestoreModule } from '../common/firestore'

const db = new Transactor(firestore, firestoreModule, {
	onUnknownField: 'error',
	checkDecorators: false,
})

// eslint-disable-next-line jest/require-hook
db('fairyAhj/*').public({
	specialty: s.string.optional,
})

describe('raw-public', () => {
	// eslint-disable-next-line jest/prefer-ending-with-an-expect
	it('should validate schema', async () => {
		expect.hasAssertions()

		await firestore.doc('fairyAhj/anthony').delete()

		await expect(
			db('fairyAhj', 'anthony').set({ favoriteOrganMarket: 'WHM' }),
			// eslint-disable-next-line jest/valid-expect-with-promise
		).rejects.toThrow('favoriteOrganMarket')

		// eslint-disable-next-line jest/valid-expect-with-promise
		await expect(db('fairyAhj/anthony')).resolves.toBeNull()

		const x = db(
			'a' as string,
			'b' as string,
			'c' as 'c' | 'cc' | 'ccc',
			'd' as 'd' | 'dd' | 'ddd',
			'e',
			'f',
			'g',
			'h',
			'i',
			'j',
			'k' as string,
			'l' as DocIdString<IDoc>,
			'm',
			'n',
			'o' as const,
			'p',
		)
		$Assert<IsIdentical<typeof x, WeakDocRef<typeof ANY_DOC>>>()
	})
})
