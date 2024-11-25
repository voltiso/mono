// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// const isCjs = typeof require === 'function'
// console.log('util.firestore/jest.config.js', isCjs ? 'cjs' : 'esm')
import baseConfig from '@voltiso/config.jest'
import { defineJestConfig } from '@voltiso/config.jest.lib'

// ! need to create a new unique object!
export default defineJestConfig({
	...baseConfig,
})
