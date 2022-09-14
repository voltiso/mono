// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import { DataHook } from './DataHook'
import { dataHook } from './DataHookConstructor'

describe('DataHook', () => {
	it('works - data', () => {
		expect.hasAssertions()

		const r = dataHook({ data: { a: 1 } }) as DataHook<{ a: number }>

		expect(r.data?.a).toBe(1)
		expect(r.a).toBe(1)
		expect(r.loading).toBeFalsy()
		expect(r.error).toBeUndefined()

		Assert<IsIdentical<typeof r.a, number | undefined>>()
		Assert<IsIdentical<typeof r.exists, boolean | undefined>>()

		if (r.exists) {
			Assert<IsIdentical<typeof r.a, number>>()
		}
	})

	it('works - no data', () => {
		expect.hasAssertions()

		const r = new DataHook({ data: null })

		expect(r.data).toBeNull()
		expect(r.loading).toBeFalsy()
		expect(r.error).toBeUndefined()
	})

	it('works - loading', () => {
		expect.hasAssertions()

		const r = new DataHook({ loading: true })

		expect(r.data).toBeUndefined()
		expect(r.loading).toBeTruthy()
		expect(r.error).toBeUndefined()
	})

	it('works - error', () => {
		expect.hasAssertions()

		const r = new DataHook({ error: new Error('test') })

		expect(r.data).toBeUndefined()
		expect(r.loading).toBeFalsy()
		expect(r.error?.message).toBe('test')
	})
})
