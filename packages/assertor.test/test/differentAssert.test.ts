// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as fs from 'node:fs/promises'
import * as path from 'node:path'

// eslint-disable-next-line es-x/no-import-meta
const __dirname = path.dirname(new URL(import.meta.url).pathname)

describe('differentAssert', () => {
	it('works', async () => {
		expect.hasAssertions()

		const file = await fs.readFile(
			// eslint-disable-next-line unicorn/prefer-module
			path.join(__dirname, '../dist/esm/differentAssert.js'),
		)

		expect(file.toString()).toMatchSnapshot()
	})
})
