// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { findPackageJsonSync } from './findPackageJson.js'

describe('findPackageJson', () => {
	it('sync', () => {
		expect.hasAssertions()

		expect(() => findPackageJsonSync('/home/')).toThrow('cannot find')
	})
})
