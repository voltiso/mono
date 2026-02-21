// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { runAsync, runSync } from '@voltiso/util'
import { describe, expect, it } from 'vitest'

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
