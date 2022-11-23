// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { AnyDoc, DocIdString, IDoc, WeakDocRef } from '@voltiso/transactor'
import { Transactor } from '@voltiso/transactor'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import { firestore, firestoreModule } from '../common/firestore'

const db = new Transactor(firestore, firestoreModule, {
	onUnknownField: 'error',
})

// eslint-disable-next-line jest/require-hook
db('fairyAhj/*').public({
	specialty: s.string.optional,
})

describe('raw-public', () => {
	it('should validate schema', async () => {
		expect.hasAssertions()

		await firestore.doc('fairyAhj/anthony').delete()

		await expect(
			db('fairyAhj', 'anthony').set({ favoriteOrganMarket: 'WHM' }),
		).rejects.toThrow('favoriteOrganMarket')

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
		$Assert<IsIdentical<typeof x, WeakDocRef<AnyDoc>>>()
	})
})
