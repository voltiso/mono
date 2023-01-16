// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { DocBuilderPlugin } from '~/Doc'
import { Doc } from '~/Doc'

import { aggregate } from './aggregate'

declare module '~/DocTypes-module-augmentation' {
	interface DocTypes {
		zebra: Zebra
	}
}

// ! have to explicitly annotate - unfortunately
const aggregator: DocBuilderPlugin<'zebra'> = aggregate('zebra')
	.into('zebra', 'testAgg')
	.with({
		target() {
			// if (this.id.length > 1) return dolphins(this.id.slice(0, -1))
			return undefined
		},

		include(acc) {
			return acc + 1
		},

		exclude(acc) {
			return acc - 1
		},
	})

class Zebra extends Doc('zebra')
	.with({
		aggregates: {
			testAgg: s.number,
		},
	})
	.withPlugin(aggregator) {}

//

describe('aggregate', () => {
	it('type', () => {
		$Assert<IsIdentical<typeof aggregator, DocBuilderPlugin<'zebra'>>>()
	})
})
