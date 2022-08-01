// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { runAsync, runSync } from '~/syncer'

import { findAndReadPackageJsonSyncer } from './findAndReadPackageJson'

describe('findAndReadPackageJson', () => {
	it('async', async () => {
		expect.hasAssertions()

		// eslint-disable-next-line unicorn/prefer-module
		const packageJson = await runAsync(findAndReadPackageJsonSyncer(__dirname))

		expect(packageJson.name).toBe('@voltiso/util')
	})

	it('sync', () => {
		expect.hasAssertions()

		// eslint-disable-next-line unicorn/prefer-module
		const packageJson = runSync(findAndReadPackageJsonSyncer(__dirname))

		expect(packageJson.name).toBe('@voltiso/util')
	})
})
