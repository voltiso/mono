// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

'use strict'

const { registerEsbuild } = require('@voltiso/util.esbuild')

registerEsbuild({
	target: `node${process.version.slice(1)}`,
})

const { defineJestConfig } = require('@voltiso/config.jest.lib')

const jestEsrConfig = require('@voltiso/config.jest.esr')

//! need to create a new unique object!
module.exports = defineJestConfig({
	...jestEsrConfig,
	globalSetup: './script/jest-globalSetup.ts',
	globalTeardown: './script/jest-globalTeardown.ts',
})
