// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as fs from 'node:fs/promises'
import * as path from 'node:path'

import { describe, expect, it } from 'vitest'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

describe('callInfo', () => {
	it('assertor', async () => {
		expect.hasAssertions()

		// ignores knip unused file warning
		;() => import('~/call-info/assertor')

		const file = await fs.readFile(
			path.join(__dirname, '../../dist/esm/call-info/assertor.js'),
		)

		expect(file.toString()).toMatchSnapshot()
	})
})
