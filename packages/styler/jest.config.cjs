// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// import { defineJestConfig } from '@voltiso/config.jest.lib'
// import * as baseJestConfig from '@voltiso/config.jest.react'

const { defineJestConfig } = require('@voltiso/config.jest.lib')
const baseJestConfig = require('@voltiso/config.jest.react')

// const isCjs = typeof require === 'function'
// console.log('jest.config.js isCjs', isCjs)

// //! need to create a new unique object!
// export default defineJestConfig({
// 	...baseJestConfig,
// })

//! need to create a new unique object!
module.exports = defineJestConfig({
	...baseJestConfig,
	// preset: 'react-native'
})
