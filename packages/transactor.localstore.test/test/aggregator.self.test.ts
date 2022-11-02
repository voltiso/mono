// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { DocBuilderPlugin, DocIdString } from '@voltiso/transactor'
import { aggregate, Doc } from '@voltiso/transactor'

import { createTransactor } from './common'

//

const db = createTransactor()

declare module '@voltiso/transactor' {
	interface DocTypes {
		dolphin: Dolphin
	}
}

const aggregator: DocBuilderPlugin<'dolphin'> = aggregate<'dolphin'>(
	'dolphin',
).into('dolphin', 'num', {
	autoCreateTarget: true,

	target() {
		if (this.id.length > 1) return dolphins(this.id.slice(0, -1))
		else return undefined
	},

	include(acc) {
		return acc + this.aggregates.num.value
	},

	exclude(acc) {
		return acc - this.aggregates.num.value
	},
})

class Dolphin extends Doc('dolphin')
	.with({
		id: s.string,

		public: {
			age: s.number.min(0).optional,
		},

		aggregates: {
			num: s.number.default(1),
		},
	})
	.withPlugin(aggregator) {}

const dolphins = db.register(Dolphin)

describe('aggregator', () => {
	it('self-referencing', async () => {
		await dolphins.add({
			id: 'josh' as DocIdString<'dolphin'>,
			age: 3,
		})

		await dolphins.add({
			id: 'joshua' as DocIdString<'dolphin'>,
			age: 2,
		})

		await expect(dolphins('jos').aggregates.num).resolves.toBe(2)
		await expect(dolphins('j').aggregates.num).resolves.toBe(2)
	})
})
