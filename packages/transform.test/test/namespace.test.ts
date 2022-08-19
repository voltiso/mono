// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as fs from 'node:fs/promises'

describe('namespace', () => {
	it('works', async () => {
		expect.hasAssertions()

		const file = await fs.readFile('./dist/cjs/namespace.d.ts')
		expect(file.toString()).toMatchSnapshot()
	})
})
