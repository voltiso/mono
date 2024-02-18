// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

//! extraneous require to avoid cyclic deps --- or not?
// const jestEsrConfig = require('@voltiso/config.jest')
import * as jestEsrConfig from '@voltiso/config.jest'

//! need to create a new unique object!
export default {
	...jestEsrConfig,
}
