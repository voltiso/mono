// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable n/no-sync */

import { runAsync, runSync } from '@voltiso/util'

import { findAndReadPackageJsonSyncer } from './findAndReadPackageJson'

// eslint-disable-next-line es-x/no-import-meta
const __dirname = new URL('.', import.meta.url).pathname

describe('findAndReadPackageJson', () => {
	it('async', async () => {
		expect.hasAssertions()

		// eslint-disable-next-line unicorn/prefer-module
		const packageJson = await runAsync(findAndReadPackageJsonSyncer(__dirname))

		expect(packageJson.name).toBe('@voltiso/util.node')
	})

	it('sync', () => {
		expect.hasAssertions()

		// eslint-disable-next-line unicorn/prefer-module
		const packageJson = runSync(findAndReadPackageJsonSyncer(__dirname))

		expect(packageJson.name).toBe('@voltiso/util.node')
	})
})
