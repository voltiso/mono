'use strict'

// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

const baseJestConfig = require('@voltiso/config.jest.esr')
const { defineEslintConfig } = require('@voltiso/config.eslint.lib')

//! need to create a new unique object!
module.exports = defineEslintConfig({
	...baseJestConfig,
	// testEnvironment: 'node',
})
