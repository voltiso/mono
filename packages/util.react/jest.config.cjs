'use strict'

// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

const baseJestConfig = require('@voltiso/config.jest.react')
const { defineJestConfig } = require('@voltiso/config.jest.lib')

//! need to create a new unique object!
module.exports = defineJestConfig({
	...baseJestConfig,
})
