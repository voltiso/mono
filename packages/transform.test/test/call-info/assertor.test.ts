// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as fs from 'node:fs/promises'
import * as path from 'node:path'

describe('callInfo', () => {
	it('assertor', async () => {
		expect.hasAssertions()

		const file = await fs.readFile(
			path.join(__dirname, '../../dist/esm/call-info/assertor.js'),
		)

		expect(file.toString()).toMatchSnapshot()
	})
})
