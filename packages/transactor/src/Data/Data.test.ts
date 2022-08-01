// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsSubtype } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type { IntrinsicFields } from '~/schemas'

import type { Data, DataWithId, DataWithoutId } from './Data'

describe('Data', () => {
	it('assignability', () => {
		expect.assertions(0)

		Assert.is<Data<IntrinsicFields & { a: 1 }>, Data>()
		Assert.is<IsSubtype<Data, Data<IntrinsicFields & { a: 1 }>>, false>()

		Assert.is<DataWithId<IntrinsicFields & { a: 1 }>, DataWithId>()
		Assert.is<
			IsSubtype<DataWithId, DataWithId<IntrinsicFields & { a: 1 }>>,
			false
		>()

		Assert.is<DataWithoutId<IntrinsicFields & { a: 1 }>, DataWithoutId>()
		Assert.is<
			IsSubtype<DataWithoutId, DataWithoutId<IntrinsicFields & { a: 1 }>>,
			false
		>()

		Assert.is<IsSubtype<DataWithoutId, DataWithId>, false>()
		Assert.is<IsSubtype<DataWithId, DataWithoutId>, false>()
	})
})
