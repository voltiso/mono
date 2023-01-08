// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as fs from 'node:fs/promises'
import * as path from 'node:path'

describe('namespace-bad', () => {
	it('works', async () => {
		expect.hasAssertions()

		const file = await fs.readFile(
			path.join(__dirname, '../../dist/esm/inline/namespace-bad.d.ts'),
		)

		expect(file.toString()).toMatchSnapshot()
	})
})
