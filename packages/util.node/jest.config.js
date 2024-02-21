// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

//! extraneous require to avoid cyclic deps --- or not?
import jestEsrConfig from '@voltiso/config.jest'
import { defineJestConfig } from '@voltiso/config.jest.lib'

//! need to create a new unique object!
export default defineJestConfig({
	...jestEsrConfig,
})
