// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from 'vitest'

import { omitIfPresent } from './omitIfPresent'

describe('omitIfPresent', () => {
	type IProperties = {
		[k: string]: unknown
	}

	it('generic', <P extends IProperties & { magic: boolean }>() => {
		expect.assertions(0)

		// type T = IProps & { magic: boolean }

		const a = { magic: true } as P
		const b = omitIfPresent(a, 'css')

		void b.magic
	})
})
