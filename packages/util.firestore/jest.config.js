// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// const isCjs = typeof require === 'function'
// console.log('util.firestore/jest.config.js', isCjs ? 'cjs' : 'esm')

//! extraneous require to avoid cyclic deps --- or not?
import * as baseConfig from '@voltiso/config.jest'

//! need to create a new unique object!
export default {
	...baseConfig,
}
