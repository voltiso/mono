// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable n/no-sync */

import { describe, expect, it } from '@jest/globals'

import { findPackageJsonSync } from './findPackageJson'

describe('findPackageJson', () => {
	it('sync', () => {
		expect.hasAssertions()

		expect(() => findPackageJsonSync('/home/')).toThrow('cannot find')
	})
})
