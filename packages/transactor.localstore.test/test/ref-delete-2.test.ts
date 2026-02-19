// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $assert } from '@voltiso/assertor'
import * as s from '@voltiso/schemar'
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

class Man extends Doc('man').with({
	id: s.string,

	private: {
		woman: sStrongRef<'woman'>().optional,
	},
}) {
	@afterCreate
	async createWoman(this: Man, params: TriggerParams.AfterCreate<Man>) {
		// ! TODO it should work with polymorphic `this`
		const woman = await women.add({
			id: params.id as never,
			man: this.ref,
		})

		this.data.woman = woman.ref
	}

	@afterDelete
	async deleteWoman(p: TriggerParams.AfterDelete<Man>) {
		$assert(p.before.woman)
		await p.before.woman.delete()
	}
}

class Woman extends Doc('woman').with({
	id: s.string,

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
			id: 'a' as never,
		})

		await expect(women('a').data.man.id).resolves.toBe('a')

		await expect(women('a').delete()).rejects.toThrow('numRefs')

		await men('a').delete()
	})
})
