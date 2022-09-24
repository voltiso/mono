// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import type { TriggerParams } from '@voltiso/transactor'
import {
	afterCreate,
	afterDelete,
	Doc,
	sRef,
	sStrongRef,
} from '@voltiso/transactor'

import { createTransactor } from './common'

const db = createTransactor()

class Man extends Doc('man')({
	private: {
		woman: sStrongRef<'woman'>().optional,
	},
}) {
	@afterCreate
	async createWoman(this: Man, p: TriggerParams.AfterCreate<Man>) {
		//! TODO it should work with polymorphic `this`
		const woman = await women.add({
			id: p.id,
			man: this.ref,
		})
		this.woman = woman.ref
	}

	@afterDelete
	async deleteWoman(p: TriggerParams.AfterDelete<Man>) {
		$assert(p.before.woman)
		await p.before.woman.delete()
	}
}

class Woman extends Doc('woman')({
	public: {
		man: sRef<'man'>(),
	},
}) {}

declare module '@voltiso/transactor' {
	interface DocTypes {
		man: Man
		woman: Woman
	}
}

const men = db('man').register(Man)
const women = db('woman').register(Woman)

describe('ref - deletion 2', () => {
	it('works', async () => {
		expect.hasAssertions()

		await men.add({
			id: 'a',
		})

		await expect(women('a').man.id).resolves.toBe('a')

		await expect(women('a').delete()).rejects.toThrow('numRefs')

		await men('a').delete()
	})
})
