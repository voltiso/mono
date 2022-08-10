// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'

import type { DocConstructor, IDocConstructor, IDocTI } from '~'

import type { $MergeTI, MergeTI } from './MergeTI'

describe('MergeTI', () => {
	it('type', <TI extends IDocTI>() => {
		expect.assertions(0)

		Assert.is<TI extends any ? MergeTI<TI> : never, IDocTI>()

		Assert.is<DocConstructor<$MergeTI<TI>>, IDocConstructor>()
	})
})
