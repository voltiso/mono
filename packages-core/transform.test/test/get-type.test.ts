// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as fs from 'node:fs/promises'

describe('import', () => {
	it('get-type', async () => {
		expect.hasAssertions()

		const file = await fs.readFile('./dist/cjs/get-type.d.ts')
		expect(file.toString()).toMatchSnapshot()
	})
})
