// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as fs from 'node:fs/promises'
import * as path from 'node:path'

import { describe, expect, it } from '@jest/globals'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

describe('import', () => {
	it('get-type', async () => {
		expect.hasAssertions()

		const file = await fs.readFile(
			path.join(__dirname, '../../dist/esm/inline/get-type.d.ts'),
		)

		expect(file.toString()).toMatchSnapshot()
	})
})
