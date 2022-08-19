// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as fs from 'node:fs/promises'

describe('alias', () => {
	it('works', async () => {
		expect.hasAssertions()

		const file = await fs.readFile('./dist/cjs/alias.d.ts')
		expect(file.toString()).toMatchSnapshot()
	})
})
