'use strict'

// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

const baseJestConfig = require('@voltiso/config.jest.esr')
const { defineJestConfig } = require('@voltiso/config.jest.lib')

//! need to create a new unique object!
module.exports = defineJestConfig({
	...baseJestConfig,
	testEnvironment: 'node',
})
