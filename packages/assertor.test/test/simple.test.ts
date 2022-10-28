// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as fs from 'node:fs/promises'
import * as path from 'node:path'

describe('simple', () => {
	it('works', async () => {
		expect.hasAssertions()

		const file = await fs.readFile(
			// eslint-disable-next-line unicorn/prefer-module
			path.join(__dirname, '../dist/esm/simple.js'),
		)

		expect(file.toString()).toMatchSnapshot()
	})
})
