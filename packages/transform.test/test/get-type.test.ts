// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as fs from 'node:fs/promises'
import * as path from 'node:path'

describe('import', () => {
	it('get-type', async () => {
		expect.hasAssertions()

		const file = await fs.readFile(
			path.join(__dirname, '../dist/cjs/get-type.d.ts'),
		)

		expect(file.toString()).toMatchSnapshot()
	})
})
