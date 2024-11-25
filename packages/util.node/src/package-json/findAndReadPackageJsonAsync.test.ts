// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable n/no-sync */

import { describe, expect, it } from '@jest/globals'
import { runAsync, runSync } from '@voltiso/util'

import { findAndReadPackageJsonSyncer } from './findAndReadPackageJson'

const __dirname = new URL('.', import.meta.url).pathname

describe('findAndReadPackageJson', () => {
	it('async', async () => {
		expect.hasAssertions()

		const packageJson = await runAsync(findAndReadPackageJsonSyncer(__dirname))

		expect(packageJson.name).toBe('@voltiso/util.node')
	})

	it('sync', () => {
		expect.hasAssertions()

		const packageJson = runSync(findAndReadPackageJsonSyncer(__dirname))

		expect(packageJson.name).toBe('@voltiso/util.node')
	})
})
